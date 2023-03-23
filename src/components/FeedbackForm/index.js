import { useState, useRef } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from '../Spinner';
import Modal from '../Modal';
import './feedbackform.scss';

const FeedbackForm = () => {
  const formRef = useRef();
  const modalRef = useRef();
  const nameRef = useRef();
  const telRef = useRef();
  const adRef = useRef();
  const textRef = useRef();

  const [file, setFile] = useState(null);
  const [raiting, setRaiting] = useState(5);
  const [loading, setLoading] = useState(false);

  const phoneRegExp = /^((\+38|)+([0-9]){10})$/;
  const nameRegExp =
    /^([a-zA-Zа-яА-ЯіІїЇєЄ]+\s?)+([a-zA-Zа-яА-ЯіІїЇєЄ]+-?[a-zA-Zа-яА-ЯіІїЇєЄ]+\s?)*$/;

  const showModal = () => {
    modalRef.current.classList.add('show');
    setTimeout(() => {
      modalRef.current.classList.remove('show');
    }, 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formRef.current.name.value ||
      !formRef.current.tel.value ||
      !formRef.current.ad.value ||
      !formRef.current.text.value
    ) {
      alert('Будь ласка, заповніть форму');
      return;
    }

    if (
      nameRef.current.children[2] ||
      telRef.current.children[2] ||
      adRef.current.children[3] ||
      textRef.current.children[1]
    ) {
      alert('Будь ласка, заповніть коректно поля');
      return;
    }

    const formData = new FormData();
    formData.append('name', formRef.current.name.value);
    formData.append('tel', formRef.current.tel.value);
    formData.append('ad', formRef.current.ad.value);
    formData.append('text', formRef.current.text.value);
    formData.append('raiting', raiting);
    if (file) {
      formData.append('file', file);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://good-feedback-server.onrender.com/send',
        formData
      );
      console.log(response.data);
      showModal();
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(
        'Упсс, щось пішло не так. Ваш відгук не відправлено. Спробуйте пізніше.'
      );
    } finally {
      setLoading(false);
      formRef.current.reset();
      setRaiting(5);
      setFile(null);
    }
  };

  return (
    <main>
      <Formik
        initialValues={{
          name: '',
          tel: '',
          ad: '',
          text: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, 'Ім`я надто коротке')
            .required('Будь ласка, заповніть це поле')
            .matches(nameRegExp, 'Некоректно введене ім`я'),
          tel: Yup.string()
            .required('Будь ласка, заповніть це поле')
            .matches(phoneRegExp, 'Некоректний номер телефону'),
          ad: Yup.string().required('Будь ласка, виберіть один варіант'),
          text: Yup.string().min(
            10,
            'Ваш відгук надто короткий, напишіть нам більше'
          ),
        })}
      >
        <Form ref={formRef} className="form" onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                '& > legend': { mt: 2 },
                gap: '12px',
                transform: 'translate(0, -40px)',
              }}
            >
              <Rating
                name="raiting"
                value={raiting}
                size="large"
                sx={{ fontSize: '36px' }}
                onChange={(event, newRaiting) => setRaiting(newRaiting)}
              />
              <Typography
                component="legend"
                sx={{ fontSize: '18px', fontWeight: '600' }}
              >
                ЗАГАЛЬНЕ ВРАЖЕННЯ
              </Typography>
            </Box>

            <Grid
              container
              spacing={2}
              sx={{
                maxWidth: '770px',
                padding: '0 20px 0 20px',
                marginBottom: '50px',
              }}
            >
              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px' }}
                  ref={nameRef}
                >
                  <label htmlFor="name">Ім`я</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Олександр"
                  />
                  <ErrorMessage className="error" name="name" component="div" />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px' }}
                  ref={telRef}
                >
                  <label htmlFor="tel">Телефон</label>
                  <Field
                    id="tel"
                    name="tel"
                    type="tel"
                    placeholder="+380681234567 або 0681234567"
                  />
                  <ErrorMessage className="error" name="tel" component="div" />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px' }}
                  ref={adRef}
                >
                  <label htmlFor="ad">Звідки про нас дізналися?</label>
                  <div className="select-wrapper">
                    <Field id="ad" name="ad" as="select">
                      <option value="">Вибрати</option>
                      <option value="Від друзів">Від друзів</option>
                      <option value="Соціальні мережі">Соціальні мережі</option>
                      <option value="Інтернет реклама">Інтернет реклама</option>
                    </Field>
                  </div>
                  <ErrorMessage className="error" name="ad" component="div" />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px' }}
                  ref={textRef}
                >
                  <Box
                    className="textarea-wrapper"
                    display="flex"
                    flexDirection="column"
                    sx={{ gap: '8px' }}
                  >
                    <label htmlFor="text">Ваш відгук</label>
                    <Field
                      id="text"
                      name="text"
                      as="textarea"
                      placeholder="Як вам наш сервіс сьогодні?"
                    />

                    <Box className="add-file-container">
                      <IconButton
                        name="file"
                        aria-label="upload picture"
                        component="label"
                        className="add-file-btn"
                      >
                        <input
                          hidden
                          name="file"
                          accept="image/*"
                          type="file"
                          onInput={(e) => handleFileChange(e)}
                        />
                        <AddAPhotoIcon className="camera-icon" />

                        {file && (
                          <img
                            className="preview"
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                          />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                  <ErrorMessage className="error" name="text" component="div" />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ gap: '8px', marginTop: '10px' }}
                >
                  {!loading ? (
                    <Button
                      variant="contained"
                      type="submit"
                      className="submit-btn"
                    >
                      ЗАЛИШИТИ ВІДГУК
                    </Button>
                  ) : (
                    <Box display="flex" justifyContent="center">
                      <Spinner />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>
      <Modal ref={modalRef} />
    </main>
  );
};

export default FeedbackForm;
