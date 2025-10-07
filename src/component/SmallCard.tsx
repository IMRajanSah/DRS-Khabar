const SmallCard = ({data}:any) => {
    const styles = {
    card: {
      display: 'flex',
      overflow: 'hidden',
      maxWidth: '100%',
      marginBottom: '0.75rem'
    },
    imageContainer: {
      flex: '0 0 150px',
      overflow: 'hidden',
    },
    image: {
      width: '150px',
      height: '10vh',
      objectFit: 'contain' as React.CSSProperties['objectFit'],
      display: 'block',
    },
    content: {
      padding: '0 0 0 1rem',
      display: 'block',
      flex: 1,
    },
    title: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#2d2767',
    },
    description: {
        display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
      fontSize: '1rem',
      color: '#555',
    },
    date: {
      fontSize: '0.85rem',
      color: '#999',
    },
  };
  
  


  return (
    <>
    {data.map((item:any)=>(
        <div style={styles.card} key={item.id}>
      <div style={styles.imageContainer}>
        <img src={item.image_urls[0]} alt={item.id} style={styles.image} />
      </div>
      <div style={styles.content}>
        <div style={styles.title}>{item.title}</div>
        <div style={styles.description}>{item.content}</div>
        <div style={styles.date}>{item.post_date}</div>
      </div>
    </div>
    ))}
    </>
    
  )
}

export default SmallCard
