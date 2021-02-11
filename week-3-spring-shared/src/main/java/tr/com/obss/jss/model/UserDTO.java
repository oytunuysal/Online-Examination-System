package tr.com.obss.jss.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserDTO {

    @NotBlank
    @Size(max = 255, min = 3, message = "Lütfen geçerli bir kullanıcı adı giriniz")
    @Email
    private String mail;

    @NotBlank
    @Size(max = 255, min = 3, message = "Lütfen geçerli bir şifre giriniz")
    private String password;

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
