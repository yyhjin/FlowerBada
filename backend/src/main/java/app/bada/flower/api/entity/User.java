package app.bada.flower.api.entity;

import app.bada.flower.api.dto.user.UserInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(indexes = @Index(name="i_token", columnList = "token"))
public class User extends BaseEntity implements UserDetails {
    @Column(nullable = false)
    private String token;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int points;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private LocalDateTime lastLoginDate;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<FlowerUser> flowerUsers = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Bookmark> bookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Delivery> deliveries = new ArrayList<>();

    public UserInfo toUserInfo(){
        return new UserInfo(this.getId(), this.getToken(), this.getNickname(), this.getPoints());
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return null;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return String.valueOf(token);
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    public void updatePoint(int points) {
        this.points = points;
    }

    public void updateLastLoginDate(LocalDateTime ldt) {
        this.lastLoginDate = ldt;
    }
}