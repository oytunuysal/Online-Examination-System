package tr.com.obss.jss.model;

import java.util.List;

import tr.com.obss.jss.entity.Result;

public class ExamResultsDTO {
    private String examName;

    private List<Result> results;

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    public ExamResultsDTO(String examName, List<Result> results) {
        this.examName = examName;
        this.results = results;
    }
}
