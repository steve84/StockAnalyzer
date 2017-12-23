package ch.steve84.stock_analyzer.entity.quandl;

import com.stripe.model.Card;
import com.stripe.model.Customer;
import com.stripe.model.Subscription;

public class StripeCustomerDTO {
	private Subscription subscription;
	private Card card;
	
	public StripeCustomerDTO() {}
	
	public StripeCustomerDTO(Customer customer) {
		if (customer != null) {
			if (customer.getSubscriptions() != null && customer.getSubscriptions().getTotalCount().equals(1))
				this.subscription = customer.getSubscriptions().getData().get(0);
			if (customer.getSources() != null && customer.getSources().getTotalCount().equals(1))
				this.card = (Card)customer.getSources().getData().get(0);
		}
	}

	public Subscription getSubscription() {
		return subscription;
	}

	public void setSubscription(Subscription subscription) {
		this.subscription = subscription;
	}

	public Card getCard() {
		return card;
	}

	public void setCard(Card card) {
		this.card = card;
	}
}
