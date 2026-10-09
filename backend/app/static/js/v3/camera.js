// ======================================
// LinguaTeacher AI Camera
// ======================================

function initCamera() {

    if (!AI.camera) return;

    AI.camera.onclick = async () => {

        try {

            const input = document.createElement("input");

            input.type = "file";

            input.accept = "image/*";

            input.capture = "environment";

            input.onchange = (event) => {

                const file = event.target.files[0];

                if (!file) return;

                createMessage(
                    "📷 Image selected: " + file.name,
                    "user"
                );

                console.log(file);

            };

            input.click();

        }

        catch (err) {

            console.error(err);

            createMessage(
                "❌ Camera unavailable.",
                "ai"
            );

        }

    };

}