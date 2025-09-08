function toggleInput() {
            let type = document.getElementById('inputType').value;
            document.getElementById('textInputSection').classList.toggle('hidden', type !== 'text');
            document.getElementById('fileInputSection').classList.toggle('hidden', type !== 'file');
        }

        function caesarCipher(text, shift) {
            return text.split('').map(char => {
                if (char.match(/[a-z]/i)) {
                    let code = char.charCodeAt(0);
                    let offset = char.toUpperCase() === char ? 65 : 97;
                    return String.fromCharCode(((code - offset + shift) % 26 + 26) % 26 + offset);
                }
                return char;
            }).join('');
        }

        function encode() {
            let key = parseInt(document.getElementById('key').value);
            if (isNaN(key)) {
                alert("Please enter a valid numeric key");
                return;
            }

            let type = document.getElementById('inputType').value;
            if (type === 'text') {
                let text = document.getElementById('textInput').value;
                let encrypted = caesarCipher(text, key);
                document.getElementById('output').value = encrypted;
                document.getElementById('downloadBtn').classList.add('hidden');
            } else {
                let fileInput = document.getElementById('fileInput').files[0];
                if (!fileInput) {
                    alert("Please select a file");
                    return;
                }
                let reader = new FileReader();
                reader.onload = function(event) {
                    let encrypted = caesarCipher(event.target.result, key);
                    document.getElementById('output').value = encrypted;
                    document.getElementById('downloadBtn').classList.remove('hidden');
                };
                reader.readAsText(fileInput);
            }
        }

        function decode() {
            let key = parseInt(document.getElementById('key').value);
            if (isNaN(key)) {
                alert("Please enter a valid numeric key");
                return;
            }

            let encodedText = document.getElementById('output').value;
            let decrypted = caesarCipher(encodedText, -key);
            document.getElementById('output').value = decrypted;
        }

        function downloadFile() {
            let encodedText = document.getElementById('output').value;
            let blob = new Blob([encodedText], { type: "text/plain" });
            let link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "encrypted.txt";
            link.click();
        }