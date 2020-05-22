const path = require("path")
const fs = require("fs")

const db = path.join(__dirname, "../db/db.json")

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.sendFile(db)
  })

  app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(db))
    let newNote = req.body
    newNote.id = Math.random()
    notes.push(newNote)
    fs.writeFile(db, JSON.stringify(notes), (err) => {
      if (err) throw err
      console.log("Success!")
    })
    res.json(newNote)
  })

  app.delete("/api/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync(db))
    const newNotes = notes.filter(note => note.id != req.params.id)
    fs.writeFile(db, JSON.stringify(newNotes), (err) => {
      if (err) throw err
      console.log("Success!")
    })
    res.json(newNotes)
  })
}
