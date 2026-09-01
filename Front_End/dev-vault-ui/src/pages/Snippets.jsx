import {
  FaPenNib,
  FaPlus,
  FaSearch,
  FaPencilAlt,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../interceptor/auth.interceptor";
import { Card } from "../components/card";
import { ToastMessage } from "../components/toast";

export function Snippet() {
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSignOut, setSignOut] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);


  const userName = localStorage.getItem("userName") || null;
  const userId = localStorage.getItem("userId") || null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`dev-vault/snippet/getAllSnippets/${userId}`);
        setSnippets(res.data?.snippets || []);
      } catch (err) {
        setErrorMsg(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Something went wrong!",
        );
        setTimeout(() => {
          setErrorMsg("");
          navigate('/login');
        }, 2000);
      }
    };
    fetchData();
  }, []);

  const onDeleteSnippet = async (id) => {
    try {
      const res = await api.delete(`dev-vault/snippet/deleteSnippetByID/${id}`);

      setSnippets((prev) => prev.filter((snippet) => snippet._id !== id));
      setSuccessMsg(res.data?.message);
      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
    } catch (err) {
      console.log(err, "ERORRRRRR");
      setErrorMsg(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Something went wrong!",
      );
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }
    finally{
      setConfirmDelete(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("userName");
    sessionStorage.removeItem("jwt_token");
    localStorage.removeItem("userId")
    setSignOut(false);
    navigate("/login");
  };

  const filteredSnippets = snippets.filter(
    (s) =>
      s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.language?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <header className="bg-gray-900 bg-opacity-85 w-full py-3 px-3 flex items-center justify-between gap-2 sm:gap-3 relative">
        <div className="flex items-center gap-2 min-w-0">
          <FaPenNib className="text-white w-4 h-4 shrink-0" />
          <h1 className="text-white text-base sm:text-lg font-bold truncate">
            Dev-Vault
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
          <Button
            onClick={() => navigate("/add_snippet")}
            className="flex items-center justify-center gap-1 text-xs sm:text-sm px-3 py-2 sm:px-4"
          >
            <FaPlus className="text-xs sm:text-sm" />
            <span className="hidden sm:inline">Add Snippet</span>
            <span className="sm:hidden">Add</span>
          </Button>

          <div className="relative">
            <div
              title={userName.toLocaleUpperCase()}
              className="bg-gray-700 rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer select-none shadow-sm hover:bg-gray-600 transition-colors z-30 relative"
              onClick={() => {
                setSignOut((prev) => !prev);
              }}
            >
              <p className="text-sm font-semibold">
                {userName.charAt(0).toUpperCase()}
              </p>
            </div>

            {showSignOut && (
              <>
                {/* Invisible backdrop layer that catches outside clicks anywhere on the viewport */}
                <div
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={() => setSignOut(false)}
                />

                {/* Sign-out popup with layer priority elevation */}
                <div className="absolute right-0 mt-2 w-32 sm:w-36 rounded-xl border border-gray-600 bg-gray-800 shadow-xl overflow-hidden z-20">
                  <button
                    className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-gray-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      signOut();
                    }}
                  >
                    <span>Sign Out</span>
                    <FaSignOutAlt className="text-xs sm:text-sm" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="py-4 sm:py-4 md:py-4 px-2">
        <p className="text-xl font-semibold text-gray-100 tracking-wide">
          Welcome{" "}
          <span className="text-indigo-600">{userName.toUpperCase()}</span>,
          <span className="italic text-gray-300">
            {" "}
            every snippet you store is a step toward mastery.
          </span>
        </p>
      </div>

      <div className="flex items-center gap-1 py-4 px-3">
        <div className="w-full max-w-md">
          <Input
            placeHolder={"Search by title, tag..."}
            className="pl-8 py-2 input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <FaSearch />
          </Input>
        </div>
      </div>

      <div className="px-3 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSnippets.length > 0 ? (
            filteredSnippets.map((snippet, index) => (
              <div key={snippet._id || index}>
                <Card className="group">
                  <div className="flex justify-between items-center gap-3 py-4">
                    <p
                      className="truncate max-w-30 text-sm sm:text-base"
                      title={snippet.title || "Untitled snippet"}
                    >
                      {snippet.title || "Untitled snippet"}
                    </p>
                    <p
                      className="border border-blue-400 max-w-22.5 w-full text-center text-blue-900 bg-blue-200 rounded-lg text-[10px] sm:text-xs shrink-0 truncate p-1"
                      title={snippet.language || "Unknown"}
                    >
                      {snippet.language?.toUpperCase()}
                    </p>
                  </div>
                  <div className="border border-gray-700 rounded-lg bg-gray-950 h-32 p-2 overflow-auto hide-scrollbar">
                    <pre className="p-2">{snippet.code}</pre>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="text-gray-600">
                      Created Dt:{" "}
                      {snippet.createdDate
                        ? new Date(snippet.createdDate).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )
                        : "N/A"}
                    </p>

                    <span className="flex gap-2 text-gray-400 cursor-pointer hover:text-white">
                      <FaPencilAlt
                        onClick={() =>
                          navigate(
                            `/update_snippet/${snippet.title}/${snippet._id}`,
                            { state: snippet },
                          )
                        }
                        className="hover:scale-110 transition-transform"
                      />
                      <FaTrash
                        onClick={() => setConfirmDelete(true)}
                        className="hover:scale-110 transition-transform"
                      />
                    </span>
                  </div>
                </Card>
                <div className="w-full">
                  {confirmDelete && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                      <Card
                        title="Are you sure you want to delete the snippet?"
                        className="bg-gray-600 p-6 rounded-lg shadow-lg text-center w-[400px] max-w-md"
                      >
                        <div className="flex justify-center mt-4 gap-6">
                          <Button
                            type="button"
                            onClick={() => setConfirmDelete(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={() => onDeleteSnippet(snippet._id)}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete
                          </Button>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No snippets found.
            </p>
          )}
        </div>
      </div>

      {successMsg && <ToastMessage type="success" msg={successMsg} />}
      {errorMsg && <ToastMessage type="error" msg={errorMsg} />}
    </div>
  );
}
