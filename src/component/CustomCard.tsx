import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ item }: { item: any }) => {
  const navigate = useNavigate();
  return (
    // <Card style={{ width: '100%', height: '34rem', overflow: 'hidden', marginBottom: '8px', cursor: 'pointer', flexDirection:'column' }} onClick={() => navigate(`/news/${item.id}`)}>
    //   <Card.Body style={{ height: '20%', overflow: 'auto' }}>
    //     <Card.Title style={{ fontWeight: 'bold', color: '#2d2767' }}>{item.title}</Card.Title>
    //   </Card.Body>
    //   <div style={{ height: '80%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
    //     <Card.Img
    //       variant="top"
    //       src={item.image_urls[0]}
    //       style={{
    //         width: '100%',
    //         height: '100%',
    //         objectFit: 'cover', // fills the container, crops if needed
    //         objectPosition: 'center',

    //       }}
    //     />
    //   </div>

    // </Card>
    <Card
      style={{
        width: '100%',
        height: '34rem',
        overflow: 'hidden',
        marginBottom: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column', // stack body and image
        border: 'none',
        boxShadow: '0',
        backgroundColor: 'transparent',
      }}
      onClick={() => navigate(`/news/${item.id}`)}
    >
      <Card.Body style={{ flex: '0 0 auto' }}>
        <Card.Title
          style={{
            fontWeight: 'bold',
            color: '#2d2767',
            fontSize: '1.85rem',
            margin: '0',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            lineHeight: '3rem',
          }}
        >
          {item.title}
        </Card.Title>
      </Card.Body>

      <div
        style={{
          flex: '1 1 auto', // take remaining space
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 1rem',
        }}
      >
        <Card.Img
          variant='top'
          src={item.image_urls[0]}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '0',
          }}
        />
      </div>
    </Card>
  );
}

export default CustomCard