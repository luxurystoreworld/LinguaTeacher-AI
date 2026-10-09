// ======================================
// LinguaTeacher AI Files
// ======================================

function initFiles() {

    if (!AI.files) return;

    AI.files.onclick = () => {

        const input = document.createElement("input");

        input.type = "file";

        input.multiple = true;

        input.accept = `
application/pdf,
application/msword,
application/vnd.openxmlformats-officedocument.wordprocessingml.document,
image/png,
image/jpeg,
image/jpg,
text/plain
`;

        input.onchange = function () {

            if (!this.files.length) return;

            for (const file of this.files) {

                createMessage(
                    "📎 " + file.name,
                    "user"
                );

                console.log(file);

            }

        };

        input.click();

    };

}