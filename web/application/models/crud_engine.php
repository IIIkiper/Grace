<?
/**
 * Выполняет CRUD операции с сущностями
 **/
class crud_engine extends CI_Model{
    
    private $json = '';               // входной JSON с данными для DML операций (CUD)
    private $ids  = array();          // ID измененных записей
    private $entity_name = '';        // название рабочей сущности
    private $entity_meta  = array();  // мета информация рабочей сущности

    public function __construct(){
        $this->load->model('meta');

        // включаем механизм транзакций
        $this->db->trans_start();
    }

    public function read( $params ){
        try{
            if (is_string($params)) {
                $params = array('entity_name' => $params);
            }

            $this->entity_name = $params['entity_name'];

            $this->entity_meta = $this->meta->get( $this->entity_name );
            $this->total_results = 0;

            //------------
            $this->prepare_select_fields();
            if (array_key_exists('sort', $params)) {
                $sort = json_decode($params['sort'], true);
                $sort = $sort[0];
                $this->db->order_by($sort['property'], $sort['direction']);
            }
            if (array_key_exists('filters', $params) && !empty($params['filters'])){
                foreach (array_keys($this->entity_meta['columns']) as $column_name){
                    if (!array_key_exists($column_name, $params['filters'])) continue;
                    if ($this->entity_meta['columns'][$column_name]['type'] != 'string'){
                        $this->db->where($column_name, $params['filters'][$column_name]);
                    } else {
                        $this->db->like($column_name, $params['filters'][$column_name]);
                    }
                }
            }
            //------------

            $this->total_results = $this->db->count_all_results( $this->entity_meta['table_name'] );



            //------------
            $this->prepare_select_fields();
            if (array_key_exists('sort', $params)) {
                $sort = json_decode($params['sort'], true);
                $sort = $sort[0];
                $this->db->order_by($sort['property'], $sort['direction']);
            }
            if (array_key_exists('filters', $params) && !empty($params['filters'])){
                foreach (array_keys($this->entity_meta['columns']) as $column_name){
                    if (!array_key_exists($column_name, $params['filters'])) continue;
                    if ($this->entity_meta['columns'][$column_name]['type'] != 'string'){
                        $this->db->where($column_name, $params['filters'][$column_name]);
                    } else {
                        $this->db->like($column_name, $params['filters'][$column_name]);
                    }
                }
            }
            //------------

            if (array_key_exists('limit', $params))
                if (array_key_exists('start', $params))
                    $this->db->limit($params['limit'], $params['start']);
                else
                    $this->db->limit($params['limit']);

            $query = $this->db->get($this->entity_meta['table_name']);
            $rows = array();
            foreach ($query->result_array() as $row){
                $rows[] = $row;
            }
            $this->db->trans_complete();
            return $rows;
        } catch (Exception $e){ $this->rollback($e->getMessage()); }
    }


    public function create( $entity_name ){
        $this->entity_name = $entity_name;
        $this->prepare_incoming_json();
        try{
            $this->entity_meta = $this->meta->get( $this->entity_name );
            foreach ($this->json['names'] as $row){
                $insert_data = array();
                foreach ($this->entity_meta['columns'] as $column_name => $column_params){
                    if ((!isset($column_params['notInsert']) || !$column_params['notInsert']) && 
                        array_key_exists($column_name, $row)){
                        $insert_data[$column_name] = $row[$column_name];
                    }
                }
                $this->db->insert($this->entity_meta['table_name'], $insert_data);
                if ($this->db->_error_message()) throw new Exception($this->db->_error_message());

                $this->ids[] = $this->db->insert_id();
            }
            $this->db->trans_complete();

            $this->prepare_select_fields();
            //$this->db->select(implode(array_keys($this->entity_meta['columns']), ','));
            $this->db->where_in('id', $this->ids);
            $query = $this->db->get($this->entity_meta['table_name']);
            foreach ($query->result_array() as $row){
                $rows[] = $row;
            }
            return $rows;

        } catch (Exception $e){ $this->rollback($e->getMessage()); }
    }

    public function update( $entity_name ){
        $this->entity_name = $entity_name;
        $this->prepare_incoming_json();
        try{
            $this->entity_meta = $this->meta->get( $this->entity_name );
            foreach ($this->json['names'] as $row){
                if (!isset($row['id'])) throw new Exception('Некорректные данные для обновления.');
                $id = $row['id'];
                $update_data = array();
                foreach ($this->entity_meta['columns'] as $column_name => $column_params){
                    if ((!isset($column_params['notUpdate']) || !$column_params['notUpdate']) && 
                        array_key_exists($column_name, $row)){
                        //isset($row[$column_name])){
                        $update_data[$column_name] = $row[$column_name];
                    }
                }
                $this->db->where('id', $id);
                $this->db->update($this->entity_meta['table_name'], $update_data);

                $this->ids[] = $id;
            }
            $this->db->trans_complete();

            $this->prepare_select_fields();
            //$this->db->select(implode(array_keys($this->entity_meta['columns']), ','));
            $this->db->where_in('id', $this->ids);
            $query = $this->db->get($this->entity_meta['table_name']);
            foreach ($query->result_array() as $row){
                $rows[] = $row;
            }
            return $rows;

        } catch (Exception $e){ $this->rollback($e->getMessage()); }
    }

    public function delete($entity_name){
        $this->entity_name = $entity_name;
        $this->prepare_incoming_json();
        try{
            $this->entity_meta = $this->meta->get( $this->entity_name );
            foreach ($this->json['names'] as $row){
                if (!isset($row['id'])) throw new Exception('Некорректные данные.');
                $this->ids[] = $row['id'];
            }
            $this->db->where_in('id', $this->ids);
            $this->db->delete($this->entity_meta['table_name']);
            $this->db->trans_complete();

            return true;

        } catch (Exception $e){ $this->rollback($e->getMessage()); }
    }

    public function get_total($entity_meta){
        try{
            return $this->total_results;
            //$this->entity_meta = $this->meta->get( $this->entity_name );
            //return $this->db->count_all($this->entity_meta['table_name']);
        } catch (Exception $e){ $this->rollback($e->getMessage()); }
        
    }


    // проверяет тип переданного массива на ассоциативность
    private function is_assoc ($arr) {
        return (is_array($arr) && (!count($arr) || count(array_filter(array_keys($arr),'is_string')) == count($arr)));
    }

    // подготавливает входные данные для DML операций
    private function prepare_incoming_json(){
        try{
            $this->json = json_decode(file_get_contents('php://input'), true);
            if (!$this->json || !isset($this->json['names']))
                throw new Exception('Неверный формат входных данных JSON.');
            if (self::is_assoc($this->json['names'])) 
                $this->json['names'] = array($this->json['names']);
            $this->ids = array();
        } catch (Exception $e){ $this->rollback($e->getMessage()); }
    }

    // обработка исключений
    private function rollback($message){
        // делаем откат всех изменений в транзакции
        $this->db->trans_rollback();
        // и откл. механизм транзакций
        $this->db->trans_off();
        // отдаем ошибку клиенту
        die( json_encode(array('success' => false, 'message' => $message)));
    }

    private function prepare_select_fields(){
        $columns = array();
        foreach ($this->entity_meta['columns'] as $column_name => $column_params){
            if (array_key_exists('type', $column_params) && $column_params['type'] == 'date'){
                $this->db->select("DATE_FORMAT($column_name, '%d.%m.%Y') as $column_name", FALSE);
            } else{
                $this->db->select($column_name);
            }
        }
        return implode($columns, ',');
    }

}
?>
