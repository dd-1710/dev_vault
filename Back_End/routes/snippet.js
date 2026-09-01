import express from 'express';
import { verifyToken } from '../middleware/auth_middleware.js';
import { addSnippet, fetchSnippets, updateSnippet, deleteSnippet } from '../controllers/snippetsController.js';

const router = express.Router()

router.post('/addSnippet/:id',verifyToken,addSnippet);
router.get('/getAllSnippets/:id',verifyToken,fetchSnippets)
router.put('/updateSnippetByID/:id',verifyToken,updateSnippet)
router.delete('/deleteSnippetByID/:id',verifyToken,deleteSnippet)

export default router;