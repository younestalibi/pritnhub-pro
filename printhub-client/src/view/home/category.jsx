import { Card , Carousel, Col,Row} from "antd";
import { Link } from "react-router-dom";
import image1 from "../../assets/images/t-shirt.avif";

const {Meta} = Card


const items = [
    {
        key: '1',
        title: 'category1',
        image: image1,
        path: 'category1'
    },
    {
        key: '2',
        title: 'category2',
        image: image1,
        path: 'category2'
    },
    {
        key: '3',
        title: 'category3',
        image: image1,
        path: 'category3'
    },

];

export default function AppCategory(){
    const chunkSize = 3; 

    
    const chunkedItems = [];
    for (let i = 0; i < items.length; i += chunkSize) {
        chunkedItems.push(items.slice(i, i + chunkSize));
    }

        return (
            <div className="block featureBlock bgGray">
            <div className="container-fluid">
            <div className="titleHolder">
                <h1>Our categries</h1>
            </div>
            <Carousel autoplay style={{marginLeft:'100px'}}  >
                    {chunkedItems.map((chunk, index) => (
                        <div key={index} >
                            <Row gutter={[16, 16]} >
                                {chunk.map(item => (
                                    <Col span={8} key={item.key} >
                                         <Link to={`products/${item.path}`}>
                                            <Card
                                                hoverable
                                                style={{ width: 240 }}
                                                cover={<img alt="example" src={item.image} />}
                                            >
                                            
                                                <Meta title={item.title} />
                                                
                                            </Card>
                                        </Link>
                                        
                                       
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </Carousel>
        </div>
        </div>
        );

}


