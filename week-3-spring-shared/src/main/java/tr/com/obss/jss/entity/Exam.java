package tr.com.obss.jss.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "EXAM")
public class Exam extends EntityBase {
    
    @Column(name = "NAME", length = 255, unique = false)
    private String name;

    @Column(name = "START_DATE", length = 255, unique = false)
    private Date startDate;

    @Column(name = "END_DATE", length = 255, unique = false)
    private String endDate;

    @Column(name = "url", length = 255, unique = true)
    private String url; //??

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="owner_id", nullable=false)
    private User owner;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Question> questions;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
