import { Carousel ,Button} from 'antd';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
export default function AppHero(){
   const items = 
   [
    {
      key: '1',
      title :'Excellence in Printing Services',
      content :'Bringing your visions to life with precision and care. Explore our range of printing solutions tailored to exceed your expectations.'
    },
   ];
    return (
        <div className="heroBlock">  
        <Carousel>
        {items.map(item=> {
          return (
            <div key={item.key} className='container-fluid' >
              
              <div className='content' >
                <h3 >{item.title}</h3>
                <p>{item.content}</p>
                <div className='btnHolder'>
                 <Button type="primary" size='large'>Discover our products</Button>
                </div>
              </div>
              </div>
            
            );
          })}
        </Carousel>
        </div>
    );
}