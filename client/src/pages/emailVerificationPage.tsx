import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyUser } from '../store/slices';
import { 
    TextField, 
    Button, 
    Typography, 
    Box, 
    Alert,
    CircularProgress,
    Container,
    Paper
} from '@mui/material';

const EmailVerificationPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading } = useSelector((state: RootState) => state.user);

    // Extract email from query parameters
    const emailValue = new URLSearchParams(location.search);
    const email = emailValue.get('email');

    // State for the verification code
    const [verificationCode, setVerificationCode] = useState('');
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!email) {
            setSubmitError('Email not found. Unable to verify.');
            return;
        }

        // Dispatch the verifyUser thunk and handle the response
        const resultAction = await dispatch(verifyUser({ email, code: verificationCode }));

        if (verifyUser.fulfilled.match(resultAction)) {
            navigate(`/protected/dashboard?email=${encodeURIComponent(email)}`); // Navigate to a dashboard
        } else {
            setSubmitError(resultAction.payload as string || 'Verification failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Email Verification
                    </Typography>

                    {email ? (
                        <>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Verification for: {email}
                            </Typography>

                            {submitError && (
                                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                                    {submitError}
                                </Alert>
                            )}

                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    label="Verification Code"
                                    type="text"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    autoComplete="off"
                                    autoFocus
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    sx={{ mt: 1 }}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        'Submit Code'
                                    )}
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            No email parameter found in the URL.
                        </Alert>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default EmailVerificationPage;
