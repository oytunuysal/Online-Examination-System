package tr.com.obss.jss.model;

import javax.validation.constraints.NotBlank;

public class AnswerDTO {
    @NotBlank
    private String questionId;
    
    private String answerId;

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getAnswerId() {
        return answerId;
    }

    public void setAnswerId(String answerId) {
        this.answerId = answerId;
    }

    
}
