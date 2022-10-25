import { useState, useEffect } from 'react';
import axios from 'axios';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Autocomplete,
    FormControl,
    TextareaAutosize,
    Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [price, setPrice] = useState()
    const [description, setDescription] = useState("")
    const [authorId, setAuthorId] = useState("")
    const [bookCategory, setBookCategory] = useState("")
    const [edition, setEdition] = useState("")
    const [image, setImage] = useState("")
    const [bookData, setBookData] = useState("f")
    const [categories, setCategories] = useState([
        "Business", "Politics", "Romantic", "Kids", "Research", "Adventure", "Inspirational", "Law", "History"
    ])
    const [options, SetOptions] = useState([
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: 'Dangal', year: 2016 },
        { label: 'The Sting', year: 1973 },
        { label: 'Monty Python and the Holy Grail', year: 1975 },
    ])

    const AddBook = () => {
        let query = `mutation MyQuery($authorId: String!, $bookData: String!, $category: String!, $description: String!, $edition: String = "", $image: String!, $price: Int!, $title: String!, $subTitle: String = "") {
            insert_books_one(object: {authorId: $authorId, bookData: $bookData, category: $category, description: $description, edition: $edition, image: $image, price: $price, title: $title, subTitle: $subTitle}) {
              authorId
              availability
              bookData
              category
              created_at
              description
              discount
              edition
              id
              image
              price
              publisher
              sold
              subTitle
              title
              totalAmountLeft
              updated_at
            }
          }`

        axios.post("https://leheket-hilcoe-55.hasura.app/v1/graphql", JSON.stringify({
            query: query,
            variables: {title: title, subTitle: subTitle, price: price, description: description, authorId: authorId, category: bookCategory, edition: edition, image, bookData: bookData}
        }),{
            headers: {
                "x-hasura-admin-secret": "3YX812ege3703HRPFtdbdPRIEe0iRXuO6CE9buCsn1nEjGMSxKXJZTJUrHWZiZ1b",
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err)
            console.log(err.response?.data)
        })
    }

    // useEffect(()=>{
    //     GetCommentsFromContactUs()
    // },[])

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>

            {/* row 3 */}
            <Grid item xs={12} md={12} lg={12}>
                <FormControl onSubmit={AddBook} sx={{ width: "100%" }} item xs={12} md={12} lg={12}>
                    <MainCard sx={{ mt: 2, pb: 2, pl: 2, pr: 2, pt: 3 }} content={false}>
                        <Grid style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%"
                        }}>
                            <TextField 
                                label="Title" 
                                color="secondary" 
                                focused 
                                sx={{width: 300}} 
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                            <TextField 
                                label="SubTitle (optional)" 
                                color="secondary" 
                                focused 
                                sx={{width: 300}}
                                value={subTitle}
                                onChange={(e)=>setSubTitle(e.target.value)}
                            />
                            <TextField 
                                label="Price" 
                                color="secondary" 
                                type="number" 
                                focused 
                                sx={{width: 300}}
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
                            />
                        </Grid>
                        <TextField 
                            multiline 
                            minRows={7} 
                            sm={7} md={5} lg={4} 
                            label="Description" 
                            color="secondary" 
                            focused 
                            fullWidth 
                            style={{marginTop: "30px"}}
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                        <Grid style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: "30px"
                        }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} 
                                    label="Author Id" 
                                    focused 
                                    color="secondary"
                                    value={authorId}
                                    onChange={(e)=>setAuthorId(e.target.value)} />
                                }
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={categories}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} 
                                label="Book Category" 
                                focused 
                                color="secondary"
                                value={bookCategory}
                                onChange={(e)=>setBookCategory(e.target.value)} />
                                }
                            />
                            <TextField 
                                label="Edition (optional)" 
                                color="secondary" 
                                focused 
                                sx={{width: 300}}
                                value={edition}
                                onChange={(e)=>setEdition(e.target.value)}
                            />
                        </Grid>
                        <Grid style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: "30px"
                        }}>
                            <TextField 
                                label="Image" 
                                fullWidth 
                                color="secondary" 
                                focused 
                                size="large"
                                value={image}
                                onChange={(e)=>setImage(e.target.value)} 
                            />
                        </Grid>
                        <Button 
                            onClick={() => AddBook()} variant="contained" sx={{mt: 5, width: 200}} size="medium">Add Book</Button>
                    </MainCard>
                </FormControl>
            </Grid>

        </Grid>
    );
};

export default DashboardDefault;
