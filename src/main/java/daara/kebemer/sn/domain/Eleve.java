package daara.kebemer.sn.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Employee entity.
 */
@ApiModel(description = "The Employee entity.")
@Entity
@Table(name = "eleve")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Eleve implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "prenom", nullable = false)
    private String prenom;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @NotNull
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @Column(name = "matricule")
    private String matricule;

    @NotNull
    @Column(name = "date_naissance", nullable = false)
    private LocalDate dateNaissance;

    @OneToMany(mappedBy = "etudiant")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Inscrit> inscrits = new HashSet<>();

    @OneToMany(mappedBy = "etudiant")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<NiveauEtud> niveauEtuds = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Parent parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public Eleve prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public Eleve nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Eleve phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAdresse() {
        return adresse;
    }

    public Eleve adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getMatricule() {
        return matricule;
    }

    public Eleve matricule(String matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public Eleve dateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public Set<Inscrit> getInscrits() {
        return inscrits;
    }

    public Eleve inscrits(Set<Inscrit> inscrits) {
        this.inscrits = inscrits;
        return this;
    }

    public Eleve addInscrit(Inscrit inscrit) {
        this.inscrits.add(inscrit);
        inscrit.setEtudiant(this);
        return this;
    }

    public Eleve removeInscrit(Inscrit inscrit) {
        this.inscrits.remove(inscrit);
        inscrit.setEtudiant(null);
        return this;
    }

    public void setInscrits(Set<Inscrit> inscrits) {
        this.inscrits = inscrits;
    }

    public Set<NiveauEtud> getNiveauEtuds() {
        return niveauEtuds;
    }

    public Eleve niveauEtuds(Set<NiveauEtud> niveauEtuds) {
        this.niveauEtuds = niveauEtuds;
        return this;
    }

    public Eleve addNiveauEtud(NiveauEtud niveauEtud) {
        this.niveauEtuds.add(niveauEtud);
        niveauEtud.setEtudiant(this);
        return this;
    }

    public Eleve removeNiveauEtud(NiveauEtud niveauEtud) {
        this.niveauEtuds.remove(niveauEtud);
        niveauEtud.setEtudiant(null);
        return this;
    }

    public void setNiveauEtuds(Set<NiveauEtud> niveauEtuds) {
        this.niveauEtuds = niveauEtuds;
    }

    public Parent getParent() {
        return parent;
    }

    public Eleve parent(Parent parent) {
        this.parent = parent;
        return this;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
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
        Eleve eleve = (Eleve) o;
        if (eleve.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eleve.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Eleve{" +
            "id=" + getId() +
            ", prenom='" + getPrenom() + "'" +
            ", nom='" + getNom() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", matricule='" + getMatricule() + "'" +
            ", dateNaissance='" + getDateNaissance() + "'" +
            "}";
    }
}
