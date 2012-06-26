<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dictionaries extends CI_Controller {

	public function index(){
		$this->load->model('crud_engine');
        $dictionaries = array(
            'dict_cities' => $this->crud_engine->read( 'dict_cities' ),
            'dict_carrier_types' => $this->crud_engine->read( 'dict_carrier_types' ),
            'dict_construction_types' => $this->crud_engine->read( 'dict_construction_types' ),
            'dict_materials' => $this->crud_engine->read( 'dict_materials' ),
            'dict_regions' => $this->crud_engine->read( 'dict_regions' ),
            'dict_sides' => $this->crud_engine->read( 'dict_sides' )
        );

        die(json_encode(array(
            'success'      => true,
            'dictionaries' => $dictionaries
        )));
	}
}
