const SUPABASE_URL = "https://ikekcalnwfdazaunwanc.supabase.co";
const SUPABASE_KEY = "sb_publishable_l_GaN_6vC5FtJ2mQr4c9wA_Cp2F2D-9";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ======================================================
// RESERVATION SYSTEM
// ======================================================

const reservationForm = document.querySelector(".reservation-form");

if (reservationForm) {

    reservationForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const inputs = reservationForm.querySelectorAll("input");
        const select = reservationForm.querySelector("select");
        const textarea = reservationForm.querySelector("textarea");
        const button = reservationForm.querySelector("button");

        const customerName = inputs[0].value.trim();
        const customerEmail = inputs[1].value.trim();
        const reservationDate = inputs[2].value;
        const reservationTime = inputs[3].value;

        // Example: "4 Guests" -> 4
        const guests = parseInt(
            select.value.replace(/\D/g, ""),
            10
        );

        const specialRequest = textarea.value.trim();

        // --------------------------------------------------
        // Detect device
        // --------------------------------------------------

        function getDeviceType() {

            const ua = navigator.userAgent || "";
            const platform = navigator.platform || "";

            if (
                /iPad/i.test(ua) ||
                (platform === "MacIntel" && navigator.maxTouchPoints > 1)
            ) {
                return "iPad";
            }

            if (
                /Android/i.test(ua) &&
                !/Mobile/i.test(ua)
            ) {
                return "Tablet";
            }

            if (
                /Mobi|Android|iPhone|iPod/i.test(ua)
            ) {
                return "Phone";
            }

            return "Laptop / Desktop";
        }

        const deviceType = getDeviceType();

        // --------------------------------------------------
        // Loading
        // --------------------------------------------------

        button.disabled = true;
        button.textContent = "SENDING...";

        // --------------------------------------------------
        // Insert reservation
        // --------------------------------------------------

        const { error } = await supabaseClient
            .from("reservations")
            .insert([
                {
                    customer_name: customerName,
                    customer_email: customerEmail,
                    reservation_date: reservationDate,
                    reservation_time: reservationTime,
                    guests: guests,
                    special_request: specialRequest,
                    device_type: deviceType,
                    status: "PENDING"
                }
            ]);

        // --------------------------------------------------
        // Error
        // --------------------------------------------------

        if (error) {

            console.error("Reservation Error:", error);

            alert(
                "SUPABASE ERROR:\n\n" +
                error.message +
                "\n\nCODE: " +
                error.code
            );

            button.disabled = false;
            button.textContent = "RESERVE A TABLE";

            return;
        }

        // --------------------------------------------------
        // Success
        // --------------------------------------------------

        alert(
            "Your reservation has been submitted successfully! 👑"
        );

        reservationForm.reset();

        button.disabled = false;
        button.textContent = "RESERVE A TABLE";

    });

}
