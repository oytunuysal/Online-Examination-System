package tr.com.obss.jss.model;

import tr.com.obss.jss.entity.Question;
import tr.com.obss.jss.entity.Result;
import tr.com.obss.jss.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

public class ExamDTO {
    @NotBlank
    @Size(max = 255, min = 3, message = "Lütfen geçerli bir sınav ismi giriniz")
    private String name;

    @NotBlank
    private Date startDate;

    @NotBlank
    private Date endDate;

    @NotBlank
    private String url;

    @NotBlank
    private User owner;

    private List<Result> results;

    @NotBlank
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

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
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

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
