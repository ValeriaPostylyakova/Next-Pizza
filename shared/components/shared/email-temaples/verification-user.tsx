import { FC } from 'react';

interface EmailTemplateProps {
    code: string;
}

export const VerificationUserTemplate: FC<Readonly<EmailTemplateProps>> = ({
    code,
}) => (
    <div>
        <p>
            Код подтверждения: <h2>{code}</h2>
        </p>

        <p>
            <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
                Подтвердить регистрацию
            </a>
        </p>
    </div>
);
