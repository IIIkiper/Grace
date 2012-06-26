<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Crud extends CI_Controller {

	public function read($entity_name){
		$this->load->model(array('crud_engine', 'meta'));

        $read_params = array();
        $read_params['entity_name'] = $entity_name;

        foreach (array('start', 'limit', 'sort') as $param){
            if ($this->input->get($param))
                    $read_params[$param] = $this->input->get($param);
        }

        $entity_meta = $this->meta->get( $entity_name );
        $read_params['filters'] = array();
        foreach (array_keys($entity_meta['columns']) as $column_name){
            if ($this->input->get($column_name))
                $read_params['filters'][$column_name] = $this->input->get($column_name);
        }
        if (empty($read_params['filters'])) unset($read_params['filters']);

        $rows = $this->crud_engine->read( $read_params );

        $total = $this->crud_engine->get_total($entity_name);
        die(json_encode(array('names' => $rows, 'success' => true, 'total' => $total)));
	}

	public function update($entity_name){
		$this->load->model('crud_engine');
        $rows = $this->crud_engine->update( $entity_name );
        die(json_encode(array('names' => $rows, 'success' => true)));
    }

    public function create($entity_name){
        $this->load->model('crud_engine');
        $rows = $this->crud_engine->create( $entity_name );
        die(json_encode(array('names' => $rows, 'success' => true)));
    }

    public function delete($entity_name){
        $this->load->model('crud_engine');
        $result = $this->crud_engine->delete( $entity_name );
        die(json_encode(array('success' => $result)));
    }

}
