package ch.steve84.stock_analyzer.service.quandl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.stripe.Stripe;
import com.stripe.exception.APIConnectionException;
import com.stripe.exception.APIException;
import com.stripe.exception.AuthenticationException;
import com.stripe.exception.CardException;
import com.stripe.exception.InvalidRequestException;
import com.stripe.model.Customer;
import com.stripe.model.DeletedCustomer;
import com.stripe.model.DeletedExternalAccount;
import com.stripe.model.ExternalAccount;
import com.stripe.model.ExternalAccountCollection;
import com.stripe.model.Subscription;
import com.stripe.model.SubscriptionCollection;

import ch.steve84.stock_analyzer.entity.quandl.User;

@Component
public class StripeService {
    
    @Value("${stripe.api.key}")
    private String stripeAPIKey;
    @Value("${stripe.plan.basic}")
    private String stripePlanBasic;
    @Value("${stripe.plan.premium}")
    private String stripePlanPremium;
    
    private void setAPiKey() {
    	if (Stripe.apiKey == null)
    		Stripe.apiKey = stripeAPIKey;
    }
    
    public User createCustomer(User user) {
    	setAPiKey();
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("description",
                String.format("UserId: %d, User: %s, Language: %s",
                        user.getUserId(),
                        user.getUsername(),
                        user.getLanguage()));
        customerParams.put("email", user.getEmail());
        Customer customer = null;
        try {
            customer = Customer.create(customerParams);
        } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException
                | APIException e) {
            return user;
        }
        if (customer != null && customer.getId() != null) {
            user.setStripeCustomer(customer.getId());
        }
        return user;
    }
    
    public boolean removeCustomer(final String customerId) {
    	setAPiKey();
        if (customerId != null) {
            try {
                Customer customer = getCustomer(customerId);
                DeletedCustomer deletedCustomer = customer.delete();
                return deletedCustomer.getDeleted();
            } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException
                    | APIException e) {
                return false;
            }
        }
        return false;
    }
    
    public boolean createSubscription(final String customerId, boolean basicPlan, boolean testMode) {
    	setAPiKey();
        if (customerId != null) {
            Map<String, Object> item = new HashMap<String, Object>();
            if (basicPlan)
                item.put("plan", stripePlanBasic);
            else
                item.put("plan", stripePlanPremium);

            Map<String, Object> items = new HashMap<String, Object>();
            items.put("0", item);

            Map<String, Object> params = new HashMap<String, Object>();
            params.put("customer", customerId);
            if (testMode)
                params.put("livemode", false);
            params.put("items", items);

            Subscription subscription = null;
            try {
                subscription = Subscription.create(params);
                return subscription.getId() != null;
            } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException
                    | APIException e) {
                return false;
            }
        }
        return false;
    }
    
    public boolean cancelSubscription(final String customerId) {
    	setAPiKey();
        if (customerId != null) {
            String subscriptionId = getSubscriptionId(customerId);
            if (subscriptionId != null) {
                try {
                    Subscription subscription = Subscription.retrieve(subscriptionId);
                    if (subscription != null) {
                        Map<String, Object> subscriptionParams = new HashMap<String, Object>();
                        subscriptionParams.put("at_period_end", false);
                        subscription.cancel(subscriptionParams);
                    }
                } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException
                        | APIException e) {
                    return false;
                }
            }
        }
        return false;
    }
    
    public boolean addCardToCustomer(final String customerId, final String token) {
    	setAPiKey();
        if (customerId != null && token != null) {
            removeCardOfCustomer(customerId);
            Customer customer = getCustomer(customerId);
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("source", token);
            try {
                ExternalAccount externalAccount = customer.getSources().create(params);
                return externalAccount.getId() != null;
            } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException
                    | APIException e) {
                return false;
            }
        }
        return false;
    }
    
    public boolean removeCardOfCustomer(final String customerId) {
    	setAPiKey();
        if (customerId != null) {
            Customer customer = getCustomer(customerId);
            if (customer != null) {
                HashMap<String, Object> sourcesParams = new HashMap<String, Object>();
                sourcesParams.put("object", "card");
                ExternalAccountCollection externalAccounts = null;
                try {
                    externalAccounts = customer.getSources().list(sourcesParams);
                    List<ExternalAccount> accounts = externalAccounts.getData();
                    if (accounts != null && accounts.size() == 1) {
                        DeletedExternalAccount delAccount = accounts.get(0).delete();
                        return delAccount.getDeleted();
                    }
                } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException
                        | APIException e) {
                    return false;
                }
            }
        }
        return false;
    }
    
    private Customer getCustomer(final String customerId) {
    	setAPiKey();
        if (customerId != null) {
            Customer customer = null;
            try {
                customer = Customer.retrieve(customerId);
            } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException
                    | APIException e) {
                return null;
            }
            return customer;
        }
        return null;
    }
    
    private String getSubscriptionId(final String customerId) {
    	setAPiKey();
        if (customerId != null) {
            Map<String, Object> subscriptionParams = new HashMap<String, Object>();
            subscriptionParams.put("customer", customerId);
            SubscriptionCollection subscriptionCollection = null;
            try {
                subscriptionCollection = Subscription.list(subscriptionParams);
            } catch (AuthenticationException | InvalidRequestException | APIConnectionException | CardException
                    | APIException e) {
                return null;
            }
            if (subscriptionCollection != null) {
                List<Subscription> subscriptions = subscriptionCollection.getData();
                if (subscriptions.size() == 1)
                    return subscriptions.get(0).getId();
            }
        }
        return null;
    }

}
