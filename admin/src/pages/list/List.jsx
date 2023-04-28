import Datatable from '../../components/datatable/Datatable';
import './list.scss';

const List = ({columns}) => {
  return (
    <div className='list'>
      <Datatable columns={columns}/>
    </div>
  )
}

export default List;