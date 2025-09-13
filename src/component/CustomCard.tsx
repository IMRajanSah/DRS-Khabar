import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const CustomCard = ({item}:{item:any}) => {
  const navigate = useNavigate();
  return (
    <Card style={{ width: '100%', height: '38rem', overflow: 'hidden',marginBottom:'8px',cursor:'pointer' }} onClick={()=>navigate(`/news/${item.id}`)}>
  <div style={{ height: '80%', overflow: 'hidden',display: 'flex',justifyContent:'center',alignItems:'center',padding:'1rem'}}> 
    <Card.Img
      variant="top"
      src={item.image_urls[0]}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover', // fills the container, crops if needed
        objectPosition: 'center',

      }}
    />
  </div>
  <Card.Body style={{ height: '20%', overflow: 'auto'}}>
    <Card.Title>{item.title}</Card.Title>
  </Card.Body>
</Card>

  )
}

export default CustomCard