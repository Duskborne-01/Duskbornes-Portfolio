document.addEventListener("DOMContentLoaded", () => {
    const purchaseButtons = document.querySelectorAll(".purchase-btn");
    const quoteButton = document.querySelector(".quote-btn");

    purchaseButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            
            const card = button.closest(".price-card");
            const planTitle = card.querySelector("h3").innerText;
            const planPrice = card.querySelector(".price").innerText;

            let userEmail = prompt(`Purchasing: ${planTitle} (${planPrice})\n\nEnter your Email ID for confirmation:`);

            if (userEmail !== null) {
                userEmail = userEmail.trim();
                
                if (userEmail === "" || !userEmail.includes("@")) {
                    alert("Please enter a valid email address containing '@'.");
                    return;
                }

                const recipient = "arhaangour777@gmail.com";
                const subject = encodeURIComponent(`Inquiry to Buy ${planTitle} (${planPrice})`);
                const body = encodeURIComponent(
                    `Hi Arhaan,\n\nI want to purchase the ${planTitle} (${planPrice}).\nMy Email ID is: ${userEmail}\n\nPlease confirm my order!`
                );

                const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
                
                // Triggers email client safely
                window.location.href = mailtoLink;
                
                // Fallback action in case mailto is restricted by the browser
                setTimeout(() => {
                    if (document.hasFocus()) {
                        alert(`If your mail app didn't open automatically, please send your details directly to: ${recipient}`);
                    }
                }, 500);
            }
        });
    });

    if (quoteButton) {
        quoteButton.addEventListener("click", (e) => {
            e.preventDefault();

            let userEmail = prompt("Custom Project Quote\n\nEnter your Email ID:");

            if (userEmail !== null) {
                userEmail = userEmail.trim();

                if (userEmail === "" || !userEmail.includes("@")) {
                    alert("Please enter a valid email address containing '@'.");
                    return;
                }

                let projectDetails = prompt("Describe your project requirements:") || "Custom project requirements.";

                const recipient = "arhaangour777@gmail.com";
                const subject = encodeURIComponent("Custom Project Quote Inquiry");
                const body = encodeURIComponent(
                    `Hi Arhaan,\n\nI would like a custom quote.\nMy Email ID is: ${userEmail}\n\nDetails:\n${projectDetails}`
                );

                window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
            }
        });
    }
});