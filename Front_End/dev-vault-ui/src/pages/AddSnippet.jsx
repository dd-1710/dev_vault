import { Card } from "../components/card";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { ToastMessage } from "../components/toast";
import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react"
import { addSnippetValidator } from "../utils/add_snippet_validator";
import { api } from "../../interceptor/auth.interceptor";

export function AddSnippet() {
  const {id} = useParams();
  const isEdit = Boolean(id);
  const location = useLocation();
  const snippet = location.state;
  const [valid, setValid] = useState(false)
  const [formData, setFormData] = useState({
    title: snippet?.title || '',
    language: snippet?.language || '',
    code: snippet?.code || '',
    desc: snippet?.desc || '',
    tags: snippet?.tags || ''
  })
  const navigate = useNavigate();
  
  const [successMsg, setSuccess] = useState("");
  const [errorMsg, setError] = useState("");
  const [formErrs, setFormErrs] = useState({
    title : "",
    language: "",
    code: "",
    desc: "",
    tags: ""
  })
  const userId = localStorage.getItem('userId') || null;

 

  const onSnippetSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = ''

      if(isEdit){
        res = await api.put(`dev-vault/snippet/updateSnippetByID/${id}`,{
        title: formData.title,
        language: formData.language,
        code: formData.code,
        desc: formData.desc,
        tags: formData.tags,
        createdDate: new Date(),
       })
      }
      else{
       const createdDate = new Date();
       const createdBy = localStorage.getItem('userName') || null;
       res = await api.post(`dev-vault/snippet/addSnippet/${userId}`, {
        ...formData,
        createdDate,
        createdBy,
        userId
      });
      }
      
      setSuccess(res.data.message)
      setTimeout(()=>{
        setSuccess('');
        navigate('/snippets');
      },1500)
    } catch(err) {
      console.error("Complete Error",err.message);
      setError(err.response?.data?.error || err.response?.data?.message || "Something went wrong");
      setTimeout(()=>{
        setError('')
      },1500)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMsg = addSnippetValidator(name, value);
    const updateErrs = { ...formErrs, [name]: errorMsg };
    const nextData = { ...formData, [name]: value };

    setFormErrs(updateErrs);
    setFormData(nextData);
    setValid(Object.values({ ...updateErrs, code: addSnippetValidator("code", nextData.code) }).every((msg) => msg === ""));
  };

  const onhandleCodeChange = (value) => {
    const errorMsg = addSnippetValidator("code", value);
    const nextData = { ...formData, code: value };
    setFormErrs({ ...formErrs, code: errorMsg });
    setFormData(nextData);
    setValid(Object.values({ ...formErrs, code: errorMsg }).every((msg) => msg === ""));
  }
  
  const onClear = () => {
  setFormData({ title: "", language: "", code: "", desc: "", tags: "" });
  setFormErrs({ title: "", language: "", code: "", desc: "", tags: "" });
  setValid(false);
};

    

  return (
    <div className="flex justify-center px-4 py-6 min-h-screen">
      <Card
        title="New Snippet"
        className="h-auto w-full max-w-5xl md:max-w-6xl lg:max-w-7xl overflow-y-auto thin-scrollbar"
      >
        <form onSubmit={onSnippetSubmit} className="w-full">
          <div className="flex flex-col lg:flex-row p-2 gap-4 lg:gap-8">
            <div className="flex-1">
              <label className="label-style">
                Title <sup className="imp">*</sup>
              </label>
              <Input
                className="py-2 w-full"
                error={formErrs.title}
                name="title"
                value={formData.title}
                type="text"
                onChange={handleChange}
              ></Input>
            </div>
            <div className="flex-1">
              <label className="label-style">
                Language<sup className="imp">*</sup>
              </label>
              <Input
                name="language"
                value={formData.language}
                error={formErrs.language}
                className="py-2 w-full"
                onChange={handleChange}
              ></Input>
            </div>
          </div>
          <div className="p-2 gap-4 w-full">
            <div className="w-full">
              <label className="label-style">Snippet</label>
              <div className="h-64 sm:h-80 md:h-96 border border-gray-700 rounded-lg overflow-hidden">
                <Editor
                  height="100%"
                  defaultLanguage={formData.language}
                  name="code"
                  value={formData.code}
                  onChange={onhandleCodeChange}
                  theme="vs-dark"
                  options={{quickSuggestions: true,
                            sugestOnTriggerCharacters: true,
                            acceptSuggestionOnCommitCharacter: true,
                            suggestSelection: "first",
                            wordBasedSuggestions: true,
                            tabCompletion: "on",
                            snippetSuggestions: "top",
                            autoClosingBrackets: "always",
                            autoClosingQuotes: "always",
                            formatOnPaste: true,
                           }}
                ></Editor>
              </div>
              {formErrs.code && (
                <p className="text-red-800 text-sm mt-1">{formErrs.code}</p>
              )}
            </div>
            <div className="w-full mt-4">
              <div className="mb-4">
                <label className="label-style">Description</label>
                <Input
                  name="desc"
                  value={formData.desc}
                  type="text"
                  error={formErrs.desc}
                  className="w-full h-20 sm:h-24"
                  onChange={handleChange}
                ></Input>
              </div>
              <div>
                <label className="label-style">Tags</label>
                <Input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  error={formErrs.tags}
                  className="w-full py-2"
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="submit"
              className={`px-4 py-2 rounded text-white ${
                valid
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!valid}
            >
              {isEdit ? "Update" : "Save"}
            </Button>

            <Button type="button" onClick={onClear}>
              Clear
            </Button>
          </div>
        </form>
      </Card>
      <div>
        {successMsg && (
          <ToastMessage type="success" msg={successMsg}></ToastMessage>
        )}
        {errorMsg && <ToastMessage type="error" msg={errorMsg}></ToastMessage>}
      </div>
    </div>
  );
}
