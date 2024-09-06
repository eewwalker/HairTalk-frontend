
import React from 'react';
import {render, screen, fireEvent, waitFor } from '@testing-library/react';
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AskQuestionPage from './page';
import { createNewQuestion } from '@/src/lib/api';

//mock dependencies
jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('react-hook-form');
jest.mock('@hookform/resolvers/zod');
jest.mock('@/src/lib/api');

//mock the UI components
jest.mock('@/components/ui/button', () => ({
    Button: ({ children, ...props }: React.PropsWithChildren<{}>) => <button {...props}>{children}</button>,
  }));
  jest.mock('@/components/ui/textarea', () => ({
    Textarea: (props: {}) => <textarea {...props} />,
  }));
  jest.mock('@/components/ui/input', () => ({
    Input: (props: {}) => <input {...props} />,
  }));
  jest.mock('@/components/ui/label', () => ({
    Label: ({ children, ...props }: React.PropsWithChildren<{}>) => <label {...props}>{children}</label>,
  }));


  describe('AskQuestionPage', () => {
    const mockSession = {
      user: { id: 'user123' },
    };
    const mockRouter = {
      push: jest.fn(),
    };
    const mockHandleSubmit = jest.fn();
    const mockRegister = jest.fn();
    const mockErrors = {};

    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: 'authenticated' });
      (useRouter as jest.Mock).mockReturnValue(mockRouter);
      (useForm as jest.Mock).mockReturnValue({
        register: mockRegister,
        handleSubmit: (cb: any) => mockHandleSubmit.mockImplementation(cb),
        formState: { errors: mockErrors },
      });
      (zodResolver as jest.Mock).mockReturnValue(jest.fn());
      (createNewQuestion as jest.Mock).mockResolvedValue({ success: true });
    });

    it('renders the question form', () => {
      render(<AskQuestionPage />);
      expect(screen.getByText('ask a question')).toBeInTheDocument();
      expect(screen.getByLabelText('title')).toBeInTheDocument();
      expect(screen.getByLabelText('content')).toBeInTheDocument();
      expect(screen.getByLabelText('tags')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'post' })).toBeInTheDocument();
    });

    it('submits the form with correct data', async () => {
      render(<AskQuestionPage />);

      const submitButton = screen.getByRole('button', { name: 'post' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockHandleSubmit).toHaveBeenCalled();
      });

      expect(createNewQuestion).toHaveBeenCalledWith('user123', expect.any(String), expect.any(String));
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });

    it('displays error messages when form validation fails', async () => {
      const mockErrorMessages = {
        title: { message: 'Title is required' },
        content: { message: 'Content is required' },
      };
      (useForm as jest.Mock).mockReturnValue({
        register: mockRegister,
        handleSubmit: (cb: any) => mockHandleSubmit.mockImplementation(cb),
        formState: { errors: mockErrorMessages },
      });

      render(<AskQuestionPage />);

      const submitButton = screen.getByRole('button', { name: 'post' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Title is required')).toBeInTheDocument();
        expect(screen.getByText('Content is required')).toBeInTheDocument();
      });
    });


  });