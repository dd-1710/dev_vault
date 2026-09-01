import Snippet from "../models/Snippet.js"


export const fetchSnippets = async (req, res) => {
    try {
        const snippetsData = await Snippet.find({userId: req.user.id});
        res.status(200).json({message:"Fetched all snippets!",snippets:snippetsData})
    }
    catch (err) {
        res.status(500).json({ message: 'Unable to fetch the snippets', error: err.message })
    }
}

export const addSnippet = async (req, res) => {
    try {
        const { title, language, code, desc, tags, createdBy, userId } = req.body

        if (!title || !language || !code || !createdBy) {
            return res.status(400).json({ error: "Please fill the required fields." })
        }

        if(!userId){
            return res.status(400).json({error: "User ID is missing."})
        }

        const exists = await Snippet.findOne({ title, userId });

        if (exists) {
            return res.status(400).json({ error: "You've already used this title name" })
        }

        const newSnippet = new Snippet({ title, language, code, desc, tags, createdBy, createdDate: Date.now(), userId })
        await newSnippet.save()
        return res.status(201).json({ message: "Snippet added successfully", snippet: newSnippet })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error while adding snippet", error: err.message })
    }
}


export const updateSnippet = async (req, res) => {
    try {
        const updatedSnippet = await Snippet.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                language: req.body.language,
                code: req.body.code,
                desc: req.body.desc,
                tags: req.body.tags,
                createdDate: req.body.createdDate
            }
        },{new:true})

        if(!updatedSnippet){
            res.status(404).json({message: "Snippet not found!"})
        }

        res.status(200).json({message: "Snippet updated successfully !",snippet: updatedSnippet})
    }catch(err){
        res.status(500).json({message:"Error while updating snippet !",error: err.message})
    }
 
}


export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found!" });
    }
    if(snippet.userId.toString() !== req.user.id){
       return res.status(403).json({message: "You are not authorized to delete this snippet."});
    }
    await Snippet.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: "Snippet deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!", error: err.message });
  }
};



