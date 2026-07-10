import express from "express";

const app = express();

let healthy = true;

app.use(express.json());

app.get("/health", (req, res) => {

    if (!healthy) {

        return res.status(500).json({

            status: "DOWN"

        });

    }

    return res.json({

        status: "UP"

    });

});

app.post("/break", (req, res) => {

    healthy = false;

    res.json({

        message: "Server Broken"

    });

});

app.post("/fix", (req, res) => {

    healthy = true;

    res.json({

        message: "Server Fixed"

    });

});

app.listen(4000, () => {

    console.log(

        "Test Server Running on 4000"

    );

});