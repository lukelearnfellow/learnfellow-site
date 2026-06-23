const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        formStatus.textContent = "Sending...";

        const formData = new FormData(contactForm);

        try {
            await fetch("https://script.google.com/macros/s/AKfycbxKePxowJr3sHjQHuYNPLeNSWJpX_M-wMYkhH81I9t8SDBCi3uL9RieWye8vHGge9v0zA/exec", {
                method: "POST",
                body: formData
            });

            formStatus.textContent = "Thanks! We'll be in touch soon.";
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = "Something went wrong. Please try again.";
        }
    });
}

const tutorData = {
    luke: {
        initials: "LR",
        image: "../assets/luke.png",
        tag: "Senior Tutor",
        name: "Luke R.",
        subjects: "Math · English · History · SAT · ACT",
        rating: "★ 5",
        rate: "$25/hr",
        bio: "Luke is passionate about helping students build confidence in challenging subjects by breaking concepts into clear, manageable steps. He works patiently with students in math, English, history, and standardized test preparation, creating a supportive environment where questions are always encouraged. Luke strives to help each student improve both academically and in their confidence as learners.",
        courses: "Algebra I, Algebra II, Geometry, English 9, English 10, AP Human Geography, AP US History, SAT Math, SAT English, ACT Math, ACT English",
        bestFor: "Any of the subjects listed.",
        payment: "https://buy.stripe.com/dRm4gycIJgJc5fMcbM1B601",
        consultation: "https://calendly.com/lukearapaka/30min"
    },
    lukem: {
        initials: "LM",
        image: "../assets/lukem.png",
        tag: "Senior Tutor",
        name: "Luke M.",
        subjects: "Math · Science · Spanish",
        rating: "★ 5",
        rate: "$20/hr",
        bio: "Luke enjoys helping students understand math, science, and Spanish by connecting classroom concepts to real-world examples and practical applications. He is patient, encouraging, and committed to helping students overcome difficult topics at their own pace. His goal is to make learning approachable and help students develop lasting confidence.",
        courses: "Algebra I, Algebra II, Biology, Spanish I, Spanish II, Middle School Classes",
        bestFor: "Any of the subjects listed.s",
        payment: "https://buy.stripe.com/dRm00ifUV78CgYu4Jk1B602",
        consultation: ""
    },
    sophia: {
        initials: "SR",
        image: "../assets/sophia.png",
        tag: "Senior Tutor",
        name: "Sophia R.",
        subjects: "English · Writing · Grammar · Spanish · Bible",
        rating: "★ 5",
        rate: "$20/hr",
        bio: "Sophia works closely with students to strengthen their writing, reading, grammar, and language skills while building confidence in the classroom. She enjoys helping students organize their thoughts, improve communication skills, and succeed in English and Spanish courses. Sophia creates a supportive learning environment where every student feels comfortable asking questions and growing academically.",
        courses: "English 9, English 10, Grammary, Writing, Proofreading Essays, Global Studies, Modern American History, Spanish I, Spanish II, Spanish III, Bible 9, Bible 10",
        bestFor: "Any of the subjects listed.",
        payment: "https://buy.stripe.com/dRmaEW9wx8cG6jQb7I1B603",
        consultation: ""
    },
    kendra: {
        initials: "KH",
        image: "../assets/kendra.png",
        tag: "Senior Tutor",
        name: "Kendra H.",
        subjects: "Latin · Math · History · Humanities",
        rating: "★ 5",
        rate: "$29/hr",
        bio: "Kendra enjoys helping students succeed in Latin, mathematics, history, and the humanities by making complex ideas easier to understand. She is patient, encouraging, and works with students to develop strong study habits and critical thinking skills. Kendra is dedicated to helping each student gain confidence and achieve their academic goals.",
        courses: "Latin I, Latin II, Latin III, Pre-Algebra, Geometry, Global Studies, APUSH, Biology, English 9, English 10, Bible 9, Bible 10, Bible 11, Humanities, Logic, Ombnibus",
        bestFor: "Any of the subjects listed.",
        payment: "https://buy.stripe.com/bJe28qeQR8cG9w27Vw1B604",
        consultation: ""
    },
    will: {
        initials: "WH",
        image: "../assets/will.png",
        tag: "Senior Tutor",
        name: "Will H.",
        subjects: "Math · Science · English · Spanish",
        rating: "★ 5",
        rate: "$18/hr",
        bio: "Will helps students strengthen their understanding of math, science, English, and Spanish through clear explanations and personalized support. He believes every student can succeed with the right guidance and works to create a positive and encouraging learning environment. Will enjoys helping students gain confidence while improving their academic skills.",
        courses: "Algebra I, Algebra II, Geometry, Chemistry, Bioogy, English 9, English 10, Spanish I, Spanish II",
        bestFor: "Any of the subjects listed.",
        payment: "https://buy.stripe.com/fZu4gy8st2SmfUqdfQ1B605",
        consultation: ""
    }
};

const tutorSearch = document.getElementById("tutorSearch");
const tutorCards = document.querySelectorAll(".tutor-card");
const noResults = document.getElementById("noResults");

if (tutorSearch) {
    tutorSearch.addEventListener("input", function () {
        const searchValue = tutorSearch.value.toLowerCase();
        let visibleCards = 0;

        tutorCards.forEach((card) => {
            const tutorKey = card.dataset.tutor;
            const tutor = tutorData[tutorKey];

            if (!tutor) {
                card.style.display = "none";
                return;
            }

            const searchableText = `
                ${tutor.name}
                ${tutor.subjects}
                ${tutor.courses}
                ${tutor.bestFor}
                ${tutor.bio}
            `.toLowerCase();

            if (searchableText.includes(searchValue)) {
                card.style.display = "block";
                visibleCards++;
            } else {
                card.style.display = "none";
            }
        });

        if (noResults) {
            noResults.style.display = visibleCards === 0 ? "block" : "none";
        }
    });
}

const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const openModalButtons = document.querySelectorAll(".open-modal");

function openTutorModal(tutorKey) {
    const tutor = tutorData[tutorKey];

    if (!tutor || !modalOverlay) return;

    const modalPhoto = document.getElementById("modalPhoto");

    if (tutor.image) {
        modalPhoto.innerHTML = `<img src="${tutor.image}" alt="${tutor.name}">`;
    } else {
        modalPhoto.innerHTML = `<span>${tutor.initials}</span>`;
    }

    document.getElementById("modalTag").textContent = tutor.tag;
    document.getElementById("modalName").textContent = tutor.name;
    document.getElementById("modalSubjects").textContent = tutor.subjects;
    document.getElementById("modalRating").textContent = tutor.rating;
    document.getElementById("modalRate").textContent = tutor.rate;
    document.getElementById("modalBio").textContent = tutor.bio;
    document.getElementById("modalCourses").textContent = tutor.courses;
    document.getElementById("modalBestFor").textContent = tutor.bestFor;
    document.getElementById("payTutorButton").href = tutor.payment;
    document.getElementById("bookConsultationButton").href = tutor.consultation;

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeTutorModal() {
    if (!modalOverlay) return;

    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

openModalButtons.forEach((button) => {
    button.addEventListener("click", function () {
        openTutorModal(button.dataset.tutor);
    });
});

if (closeModal) {
    closeModal.addEventListener("click", closeTutorModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", function (event) {
        if (event.target === modalOverlay) {
            closeTutorModal();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeTutorModal();
    }
});

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
        mobileNav.classList.toggle("active");
    });
}

const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.getElementById("newsletterStatus");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        newsletterStatus.textContent = "Subscribing...";

        const email =
            document.getElementById("newsletterEmail").value;

        const source =
            window.location.pathname.includes("resources")
            ? "Resources"
            : "Homepage";

        const formData = new FormData();
        formData.append("email", email);
        formData.append("source", source);

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbwkwCxMV5SBYxiGTClnzlI70zeF7O0VvKpI6C6s6jCMy-gkzjatZdu_2qdIYNDdOttQNg/exec",
                {
                    method: "POST",
                    body: formData
                }
            );

            newsletterStatus.textContent =
                "Thanks for subscribing!";

            newsletterForm.reset();
        }
        catch {
            newsletterStatus.textContent =
                "Something went wrong. Please try again.";
        }
    });
}