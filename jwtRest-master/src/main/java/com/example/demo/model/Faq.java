package com.example.demo.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Faq {
    private Long id;
    private String userid;
    private String question;
    private String answer;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "USERID")
    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    @Basic
    @Column(name = "QUESTION")
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    @Basic
    @Column(name = "ANSWER")
    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Faq faq = (Faq) o;
        return Objects.equals(id, faq.id) && Objects.equals(userid, faq.userid) && Objects.equals(question, faq.question) && Objects.equals(answer, faq.answer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userid, question, answer);
    }
}
