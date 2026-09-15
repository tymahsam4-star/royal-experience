// ======================================================
// ROYAL EXPERIENCE - SUPABASE CONNECTION
// ======================================================

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

        // --------------------------------------------------
        // Get form elements
        // --------------------------------------------------

        const inputs = reservationForm.querySelectorAll("input");
        const select = reservationForm.querySelector("select");
        const textarea = reservationForm.querySelector("textarea");
        const button = reservationForm.querySelector("button");

        // --------------------------------------------------
        // Get customer information
        // --------------------------------------------------

        const customerName = inputs[0].value.trim();
        const customerEmail = inputs[1].value.trim();
        const reservationDate = inputs[2].value;
        const reservationTime = inputs[3].value;
        const guest = select.value;
        const specialRequest = textarea.value.trim();

        // --------------------------------------------------
        // Detect device
        // --------------------------------------------------

        function getDeviceType() {

            const ua = navigator.userAgent || "";
            const platform = navigator.platform || "";

            // iPad
            if (
                /iPad/i.test(ua) ||
                (platform === "MacIntel" && navigator.maxTouchPoints > 1)
            ) {
                return "iPad";
            }

            // Android Tablet
            if (
                /Android/i.test(ua) &&
                !/Mobile/i.test(ua)
            ) {
                return "Tablet";
            }

            // Phone
            if (
                /Mobi|Android|iPhone|iPod/i.test(ua)
            ) {
                return "Phone";
            }

            // Computer
            return "Laptop / Desktop";
        }

        const deviceType = getDeviceType();

        // --------------------------------------------------
        // Loading state
        // --------------------------------------------------

        button.disabled = true;
        button.textContent = "SENDING...";

        // --------------------------------------------------
        // Send reservation to Supabase
        // --------------------------------------------------

const { error } = await supabaseClient
    .from("reservations")
    .insert([
        {
            customer_name: customerName,
            customer_email: customerEmail,
            reservation_date: reservationDate,
            reservation_time: reservationTime,
            guest: guest,
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
        error.code +
        "\n\nDETAILS: " +
        error.details
    );

    button.disabled = false;
    button.textContent = "RESERVE A TABLE";

    return;
}
        // --------------------------------------------------
        // Success
        // --------------------------------------------------

        console.log("Reservation successfully created:", data);

        alert(
            "Your reservation has been submitted successfully! 👑"
        );

        reservationForm.reset();

        button.disabled = false;
        button.textContent = "RESERVE A TABLE";

    });

}
