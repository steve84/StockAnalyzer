package ch.steve84.stock_analyzer.enums;

import ch.steve84.stock_analyzer.entity.quandl.Role;

public enum Roles {
    ADMIN (new Role(1, "Admin")),
    GPU (new Role(2, "GPU")),
    ABO (new Role(3, "Abo"));

    private final Role role;

    private Roles(Role role) {
        this.role = role;
    }

    public Role getRole() {
        return role;
    }
}
