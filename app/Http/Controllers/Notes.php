<?php

namespace App\Http\Controllers;

use App\Models\Notes as NotesModel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class Notes extends Controller
{
    const DATA_NOT_FOUND = 'Nenhum note encontrado';
    const PARAMETER_NOT_EMPTY = 'Paramentros não podem estar vazios';
    const DATA_DELETED = 'Note deletado com sucesso';
    const DATA_ALREADY_DELETED = 'Este note já foi deletado';
    const DATA_RECICLED = 'Note foi reciclado';
    const DATA_UPDATED_SUCCESSFUL = 'Note atualizado';
    const PARAMETER_IS_NOT_LESS_100 = 'Parametro não pode ter mais que 100 caracteres';
    const DATA_SAVED = 'Note salvo com sucesso';
    const DATA_NOT_DELETED_YET = 'Note ainda não deletado';

    private $data = [
        'message' => '',
        'notes' => [],
        'statusCode' => 200
    ];

    private $response;

    public function __construct()
    {
        $this->response = new Response();
    }

    public function list($is_list_trash = false)
    {
        try {
            $notes = NotesModel::where('is_deleted', $is_list_trash)
                ->orderBy('id')
                ->get();
            if ($notes->count() == 0) {
                throw new Exception($this::DATA_NOT_FOUND, Response::HTTP_NOT_FOUND);
            }
            $this->data['message'] = (!$is_list_trash) ? 'Todos os notes' : 'Notes na lixeira';
            foreach ($notes as $note) {
                $this->data['notes'][] = [
                    'id' => $note->id,
                    'title' => $note->title,
                    'content' => $note->content,
                    'type' => $note->type,
                    'is_deleted' => boolval($note->is_deleted)
                ];
            }
            $this->response->setContent($this->data);
            return $this->response;
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }

    public function listTrash()
    {
        return $this->list(true);
    }

    public function get(int $id_note)
    {
        try {
            if (!$id_note) {
                throw new Exception($this::PARAMETER_NOT_EMPTY, Response::HTTP_BAD_REQUEST);
            }
            $note = NotesModel::where('id', $id_note)->first();
            if (!$note) {
                throw new Exception($this::DATA_NOT_FOUND, Response::HTTP_NOT_FOUND);
            }
            $this->data['message'] = "Your note $note->title";
            $this->data['notes'] = $note->toArray();
            $this->response->setContent($this->data);
            return $this->response;
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }

    public function store(Request $request)
    {
        try {
            $body = $this->validateNote($request->all());

            if ($body->fails()) {
                throw new Exception($this::PARAMETER_NOT_EMPTY, Response::HTTP_BAD_REQUEST);
            }

            $params = $body->validated();
            $note = new NotesModel();
            $note->title = $params['title'];
            $note->content = $params['content'];
            $note->type = $params['type'];
            $note->save();

            $this->data['message'] = $this::DATA_SAVED;
            $this->data['notes'] = $note->toArray();

            $this->response->setContent($this->data);

            return $this->response;
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }

    public function update(Request $request)
    {
        try {

            $body = $this->validateNote($request->all());

            if ($body->fails() || !$request->get('id_note')) {
                throw new Exception($this::PARAMETER_NOT_EMPTY, Response::HTTP_BAD_REQUEST);
            }
            $params = $body->validated();
            $params['id_note'] = $request->get('id_note');
            $note = NotesModel::where('is_deleted', false)->where('id', $params['id_note'])->first();
            if (!$note) {
                throw new Exception($this::DATA_NOT_FOUND, Response::HTTP_NOT_FOUND);
            }
            $note->title = $params['title'];
            $note->content = $params['content'];
            $note->type = $params['type'];
            $note->save();

            $this->data['message'] = $this::DATA_SAVED;
            $this->data['notes'] = $note->toArray();

            $this->response->setContent($this->data);

            return $this->response;
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }

    public function delete(Request $request)
    {
        $id_note = $request->get('id_note');
        try {
            if (!$id_note) {
                throw new Exception($this::PARAMETER_NOT_EMPTY, Response::HTTP_BAD_REQUEST);
            }
            $note = NotesModel::find($id_note);
            if (!$note) {
                throw new Exception($this::DATA_NOT_FOUND, Response::HTTP_NOT_FOUND);
            }
            if ($note->is_deleted) {
                throw new Exception($this::DATA_ALREADY_DELETED, Response::HTTP_BAD_REQUEST);
            }
            $note->is_deleted = true;
            $note->save();
            $this->data['message'] = $this::DATA_DELETED;
            $this->data['notes'] = $note->toArray();
            $this->response->setContent($this->data);
            return $this->response;
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }

    public function recicle(Request $request)
    {
        $id_note = $request->get('id_note');
        try {
            if (!$id_note) {
                throw new Exception($this::PARAMETER_NOT_EMPTY, Response::HTTP_BAD_REQUEST);
            }
            $note = NotesModel::find($id_note);
            if (!$note) {
                throw new Exception($this::DATA_NOT_FOUND, Response::HTTP_NOT_FOUND);
            }
            if (!$note->is_deleted) {
                throw new Exception($this::DATA_NOT_DELETED_YET, Response::HTTP_BAD_REQUEST);
            }
            $note->is_deleted = false;
            $note->save();
            $this->data['message'] = $this::DATA_RECICLED;
            $this->data['notes'] = $note->toArray();
            $this->response->setContent($this->data);
            return $this->response;
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), $e->getCode());
        }
    }

    private function validateNote($form)
    {
        return Validator::make($form, [
            'title' => 'required|max:100',
            'content' => 'required',
            'type' => 'required'
        ], [
            'title.required' => $this::PARAMETER_NOT_EMPTY,
            'title.max' => $this::PARAMETER_IS_NOT_LESS_100,
            'content.required' => $this::PARAMETER_NOT_EMPTY,
            'type.required' => $this::PARAMETER_NOT_EMPTY
        ]);
    }

    private function errorResponse($msg = '', $code = 400)
    {
        $code = $code == 0 ? 500 : $code;
        $this->data['message'] = $msg;
        $this->data['statusCode'] = $code;
        $this->response->setContent($this->data);
        return $this->response;
    }
}
