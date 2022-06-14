import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL_API 
const NoteService = axios.create({
    baseURL: baseUrl
});
export default NoteService
