const SUPABASE_URL = "https://ikekcalnwfdazaunwanc.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_l_GaN_6vC5FtJ2mQr4c9wA_Cp2F2D-9";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
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
        const guest = select.value;
        const specialRequest = textarea.value.trim();

        // Detect device automatically
        function getDeviceType() {

            const ua = navigator.userAgent || "";
            const platform = navigator.platform || "";

            if (
                /iPad/i.test(ua) ||
                (platform === "MacIntel" && navigator.maxTouchPoints > 1)
            ) {
                return "iPad";
            }

            if (/Android/i.test(ua) && !/Mobile/i.test(ua)) {
                return "Tablet";
            }

            if (/Mobi|Android|iPhone|iPod/i.test(ua)) {
                return "Phone";
            }

            return "Laptop / Desktop";
        }

        const deviceType = getDeviceType();

        button.disabled = true;
        button.textContent = "SENDING...";

        const { data, error } = await supabaseClient
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
            ])
            .select();

        if (error) {

            console.error("Reservation Error:", error);

            alert(
                "Sorry, your reservation could not be submitted. Please try again."
            );

            button.disabled = false;
            button.textContent = "RESERVE A TABLE";

            return;
        }

        alert(
            "Your reservation has been submitted successfully! 👑"
        );

        reservationForm.reset();

        button.disabled = false;
        button.textContent = "RESERVE A TABLE";

    });

}