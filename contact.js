document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("senderName").value.trim();
      const email = document.getElementById("senderEmail").value.trim();
      const subject = document.getElementById("msgSubject").value.trim();
      const message = document.getElementById("msgBody").value.trim();

      if (!email || !email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
      }

      const recipient = "arhaangour777@gmail.com";
      const encodedSubject = encodeURIComponent(
        `[Portfolio Contact] ${subject} - from ${name}`,
      );
      const encodedBody = encodeURIComponent(
        `Hi Arhaan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      );

      const mailtoLink = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
      const gmailWebLink = `https://mail.google.com/mail/?view=cm&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`;

      window.location.href = mailtoLink;

      setTimeout(() => {
        if (document.hasFocus()) {
          window.open(gmailWebLink, "_blank");
        }
      }, 600);
    });
  }
});