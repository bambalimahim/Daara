package daara.kebemer.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Classe.
 */
@Entity
@Table(name = "classe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Classe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code_classe")
    private String codeClasse;

    @NotNull
    @Column(name = "nom_classe", nullable = false)
    private String nomClasse;

    @OneToMany(mappedBy = "niveau")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Inscrit> inscrits = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Maitre maitre;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeClasse() {
        return codeClasse;
    }

    public Classe codeClasse(String codeClasse) {
        this.codeClasse = codeClasse;
        return this;
    }

    public void setCodeClasse(String codeClasse) {
        this.codeClasse = codeClasse;
    }

    public String getNomClasse() {
        return nomClasse;
    }

    public Classe nomClasse(String nomClasse) {
        this.nomClasse = nomClasse;
        return this;
    }

    public void setNomClasse(String nomClasse) {
        this.nomClasse = nomClasse;
    }

    public Set<Inscrit> getInscrits() {
        return inscrits;
    }

    public Classe inscrits(Set<Inscrit> inscrits) {
        this.inscrits = inscrits;
        return this;
    }

    public Classe addInscrit(Inscrit inscrit) {
        this.inscrits.add(inscrit);
        inscrit.setNiveau(this);
        return this;
    }

    public Classe removeInscrit(Inscrit inscrit) {
        this.inscrits.remove(inscrit);
        inscrit.setNiveau(null);
        return this;
    }

    public void setInscrits(Set<Inscrit> inscrits) {
        this.inscrits = inscrits;
    }

    public Maitre getMaitre() {
        return maitre;
    }

    public Classe maitre(Maitre maitre) {
        this.maitre = maitre;
        return this;
    }

    public void setMaitre(Maitre maitre) {
        this.maitre = maitre;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Classe classe = (Classe) o;
        if (classe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Classe{" +
            "id=" + getId() +
            ", codeClasse='" + getCodeClasse() + "'" +
            ", nomClasse='" + getNomClasse() + "'" +
            "}";
    }
}
