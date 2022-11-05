const ascii_value_a = 97;
const ascii_value_e = 101;
const ascii_value_z = 122;
const num_letters_in_alphabet = 26;
var counter = 0;

function decode_without_key() {
    document.getElementById("ciphertext").style.borderColor = "var(--border_color)";
    var max = 0;
    var shifted_e_index;
    console.log("Decoding...");
    var decoded_text = document.getElementById("ciphertext").value.toLowerCase().replaceAll("<lb>", "");
    if (decoded_text == "" || decoded_text == "your ciphertext...") {
        document.getElementById("ciphertext").style.borderColor = "var(--alert)";
        return;
    }
    // get occurences of every character in decoded text
    let occurences = Array(255).fill(0);
    for (let i = 0; i < decoded_text.length; i++) {
        occurences[decoded_text.charCodeAt(i)]++;
    }
    // get the most common character which is an lowercase letter
    for (let i = ascii_value_a; i <= ascii_value_z; i++) {
        if (occurences[i] > max) {
            max = occurences[i];
            shifted_e_index = i;
        }
    }
    // calculate the shift of e
    var shift = shifted_e_index - ascii_value_e;
    // negative shift means that the most common character is a,b,c or d -> convert shift
    if (shift < 0) shift = num_letters_in_alphabet - Math.abs(shift);
    if (max == 1) shift = 0;
    document.getElementById("msg").innerHTML = "Identified shift: " + shift + " [a -> " + String.fromCharCode(ascii_value_a + shift) + "]";
    document.getElementById("encoded_text").innerHTML = decrypt(decoded_text, shift);
    console.log("Decryption terminates");
    console.log("Decryption was applied to " + counter + " characters");
}

function decode_with_key() {
    document.getElementById("msg").innerHTML = "";
    document.getElementById("key").style.borderColor = "var(--border_color)";
    document.getElementById("ciphertext").style.borderColor = "var(--border_color)";
    console.log("Decoding with provided key...");
    const shift = document.getElementById("key").value.toLowerCase().replaceAll(" ", "");
    // get decrypted text
    var decoded_text = document.getElementById("ciphertext").value.toLowerCase().replaceAll("<lb>", "");
    if (decoded_text == "" || decoded_text == "your ciphertext...") {
        document.getElementById("ciphertext").style.borderColor = "var(--alert)";
        return;
    }
    if (shift == "" || shift == "enteryourkeyhere") {
        key_error("");
        return;
    }
    if (isNaN(shift)) {
        key_error("Must be a number");
        return;
    }
    if (shift < 0 || shift > 26) {
        key_error("Must be a number between 0 and 26");
        return;
    }
    // Decrypt the text with given key
    document.getElementById("encoded_text").innerHTML = decrypt(decoded_text, shift);
    console.log("Decryption terminates");
    console.log("Decryption was applied to " + counter + " characters");
}

function decrypt(decoded_text, shift) {
    counter = 0;
    let encoded_string_return = "";
    for (let i = 0; i < decoded_text.length; i++) {
        let c = decoded_text.charCodeAt(i);
        if (c >= ascii_value_a && c <= ascii_value_z) {
            counter++;
            // current character is a letter with ascii value between 97 and 122
            // -> decryption has to be applied
            if (c - shift >= ascii_value_a) {
                encoded_string_return += String.fromCharCode(c - shift);
            } else {
                encoded_string_return += String.fromCharCode(
                    c + num_letters_in_alphabet - shift
                );
            }
        } else {
            // current character is a special character with ascii value that is not in between 97 - 122
            // -> no decryption is needed
            encoded_string_return += String.fromCharCode(c);
        }
    }
    return encoded_string_return;
}

function key_error(error_msg) {
    document.getElementById("msg").innerHTML = error_msg;
    document.getElementById("key").style.borderColor = "var(--alert)";
}