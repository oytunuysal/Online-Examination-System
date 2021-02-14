package tr.com.obss.jss.entity;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;

@Entity
@Table(name = "QUESTION")
public class Question extends EntityBase {
    //change data types
    @Column(name = "TEXT", length = 255, unique = false)
    private String questionText;

    @Column(name = "POINT", unique = false)
    private String point;

    @ElementCollection
    private List<String> possibleAnswers;

    @Column(name = "ANSWER", unique = false)
    private String answer;

    @Column(name = "PENALTY_POINT", unique = false)
    private String penaltyPoint;

    @ManyToOne
    @JsonBackReference
    private Exam exam;

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
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

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public String getPoint() {
        return point;
    }

    public void setPoint(String point) {
        this.point = point;
    }

    public String getPenaltyPoint() {
        return penaltyPoint;
    }

    public void setPenaltyPoint(String penaltyPoint) {
        this.penaltyPoint = penaltyPoint;
    }
}
