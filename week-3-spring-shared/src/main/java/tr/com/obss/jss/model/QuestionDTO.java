package tr.com.obss.jss.model;

import java.util.List;

public class QuestionDTO {
    private String questionText;

    private String point;

    private List<String> possibleAnswers;

    private String answer;

    private String penaltyPoint;

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getPoint() {
        return point;
    }

    public void setPoint(String point) {
        this.point = point;
    }

    public List<String> getPossibleAnswers() {
        return possibleAnswers;
    }

    public void setPossibleAnswers(List<String> possibleAnswers) {
        this.possibleAnswers = possibleAnswers;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getPenaltyPoint() {
        return penaltyPoint;
    }

    public void setPenaltyPoint(String penaltyPoint) {
        this.penaltyPoint = penaltyPoint;
    }

}
