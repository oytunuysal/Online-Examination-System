package tr.com.obss.jss.entity;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "QUESTION")
public class Question extends EntityBase {

    @Column(name = "TEXT", length = 255, unique = false)
    private String questionText;

    @Column(name = "POINT", unique = false)
    private int point;

    @ElementCollection
    private List<String> possibleAnswers;

    @Column(name = "ANSWER", unique = false)
    private String answer;

    @Column(name = "PENALTY_POINT", unique = false)
    private double penaltyPoint;

    @ManyToOne
    private Exam exam;

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public int getPoint() {
        return point;
    }

    public void setPoint(int point) {
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

    public double getPenaltyPoint() {
        return penaltyPoint;
    }

    public void setPenaltyPoint(double penaltyPoint) {
        this.penaltyPoint = penaltyPoint;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }
}
