<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class test extends CI_Controller {

	public function index(){
		$this->load->model('crud');
        $this->crud->read();
        //var_dump_($this->meta->get('ap_passport'));
	}
}
