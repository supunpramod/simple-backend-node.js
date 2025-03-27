import express from 'express'; // Express ගේනවා. මේකෙන් වෙබ් server එක හදන්න පුළුවන්.
import bodyParser from 'body-parser'; // Body Parser ගේනවා. එන දත්ත ලේසියෙන් ගන්න උදව් වෙනවා.
import mongoose from 'mongoose'; // Mongoose ගේනවා. MongoDB එක්ක ලේසියෙන් වැඩ කරන්න උදව් වෙනවා.

const app = express(); // Express එකෙන් app එකක් හදනවා. මේක තමයි server එක.

const mongoUrl = "mongodb+srv://admin:1234@std1.6tba0xh.mongodb.net/?retryWrites=true&w=majority&appName=std1"; 
// MongoDB එක්ක සම්බන්ධ වෙන්න URL එක. database එකට යන්න ලිපිනය ලියලා තියෙනවා.

mongoose.connect(mongoUrl, {}); // MongoDB එක්ක සම්බන්ධ වෙන්න Mongoose එක භාවිතා කරනවා.

const connection = mongoose.connection; // Mongoose එකේ connection එක ගබඩා කරනවා.

connection.once("open", () => { // Database එක connect උනාම එක පාරක් වැඩ කරනවා.
    console.log("Database Connected"); // "Database Connected" කියලා පෙන්නනවා.
});

// Student Schema එක app.post එකෙන් එළියට ගන්නවා. මේක එක පාරක් හදන්න ඕනේ.
const studentSchema = mongoose.Schema({
    name: String, // නම string විදියට ගන්නවා.
    age: Number, // වයස අංකයක් විදියට ගන්නවා.
    gender: String // ස්ත්‍රී/පුරුෂ භාවය string විදියට ගන්නවා.
});

const Student = mongoose.model("students", studentSchema); // "students" collection එකට Student model එක හදනවා.

app.use(bodyParser.json()); // Body Parser එක JSON දත්ත ලේසියෙන් ගන්න ලෑස්ති කරනවා.

app.post("/", (req, res) => { // "/" කියන ලිපිනයට POST ඉල්ලීමක් ආවම මේක වැඩ කරනවා.
    const newStudent = new Student(req.body); // req.body එකෙන් එන දත්ත (name, age, gender) Student එකට දානවා.

    newStudent.save() // Database එකේ save කරනවා.
        .then(() => { // Save උනාම වැඩ කරනවා.
            res.json({ // JSON විදියට පිළිතුර යවනවා.
                message: "Student Created" // "Student Created" කියලා යවනවා.
            });
        })
        .catch((error) => { // Save වැරදුණොත් වැඩ කරනවා.
            res.json({ // JSON විදියට පිළිතුර යවනවා.
                message: "Error" // "Error" කියලා යවනවා.
            });
            console.log("Error:", error); // Error එක console එකේ පෙන්නනවා.
        });
});




/*
app.get("/", (req, res) => { // "/" කියන ලිපිනයට GET ඉල්ලීමක් ආවම මේක වැඩ කරනවා.
    console.log("this is get request"); // "this is get request" කියලා පෙන්නනවා.
    console.log(req); // ඉල්ලීමේ සේරම දත්ත පෙන්නනවා.
    console.log(req.body); // Body එකේ JSON දත්ත පෙන්නනවා.

    res.json({ // JSON විදියට පිළිතුර යවනවා.
        message: "hello " + req.body.name // "hello" එක්ක name එක යවනවා.
    });
});
*/

app.listen(3000, () => { // Server එක 3000 port එකේ ලෑස්ති කරලා ගමන් යනවා.
    console.log("server is running on port 3000"); // "server එක 3000 එකේ යනවා" කියලා පෙන්නනවා.
});