<?
/**
 * Отдает мета-модель данных для необходимой сущности
 **/
class meta extends CI_Model{
    public function get($entity){
        if ($entity == 'units') return $this->units();
        elseif (in_array($entity, array(
            'dict_carrier_types',
            'dict_construction_types',
            'dict_materials',
            'dict_regions',
            'dict_sides'
        ))) return $this->standart_dictionary($entity);
        elseif ($entity == 'dict_cities') return $this->dict_cities();
        else throw new Exception("There is no meta model for this entity: $entity!");
    }

    // паспорт АП
    private function units(){
        $columns = array(
            'id'                    => array( 'type' => 'int',
                                              'notUpdate' => true ),
            'id_city'               => array( 'type' => 'int' ),
            'id_construction'       => array( 'type' => 'int' ),
            'address'               => array( 'type' => 'string' ),
            'id_side'               => array( 'type' => 'int' ),
            'lighting'              => array( 'type' => 'boolean' ),
            'code_side'             => array( 'type' => 'string' ),
            'code_construction'     => array( 'type' => 'int' ),
            'foto'                  => array( 'type' => 'string' ),
            'scheme'                => array( 'type' => 'string' ),
            'id_carrier'            => array( 'type' => 'int' ),
            'id_material'           => array( 'type' => 'int' ),
            'price'                 => array( 'type' => 'int' ),
            'installation'          => array( 'type' => 'int' ),
            'tax'                   => array( 'type' => 'int'),
            'code_espar'            => array( 'type' => 'int'),
            'grp'                   => array( 'type' => 'int'),
            'address_russian_grace' => array( 'type' => 'string'),
            'address_english_grace' => array( 'type' => 'string'),
            'unit_code_grace_new'            => array( 'type' => 'int'),
            'latitude'              => array( 'type' => 'float'),
            'longitude'             => array( 'type' => 'float'),
            'lastknown_availability' => array( 'type' => 'date'),
            'ownership'             => array('type' => 'int'),
            'unit_code_suppl'       => array('type' => 'string')
        );
        $table_name = 'units';

        return array(
            'table_name'   => $table_name,
            'columns'      => $columns
        );
    }

    // общие словари вида id-name
    public function standart_dictionary($entity){
        return array(
            'table_name' => $entity,
            'columns'    => array(
                'id'       => array( 'type' => 'int', 'notUpdate' => true),
                'name'     => array( 'type' => 'string')
            )
        );
    }

    // словарь городов в привязке к региону
    public function dict_cities(){
        return array(
            'table_name' => 'dict_cities',
            'columns'    => array(
                'id'        => array( 'type' => 'int', 'notUpdate' => true),
                'name'      => array( 'type' => 'string'),
                'id_region' => array( 'type' => 'int')
            )
        );
    }
}
?>
