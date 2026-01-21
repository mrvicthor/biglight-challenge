import { useState } from 'preact/hooks';
import { Button } from './button';
import { Input } from './input';
import { Dropdown } from './dropdown';
import ContactCard from './card';
import type { DropdownOption } from '../types';

const customerTypes: DropdownOption[] = [
    { label: 'Guest', value: 'guest' },
    { label: 'Member', value: 'member' },
    { label: 'Business', value: 'business' },
];

export const LoginForm = () => {
    const [customerType, setCustomerType] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    return (
        <div className="bg-surface-colour-page text-text-colour-body">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="grid gap-[6.25rem] lg:grid-cols-2">
                    <div className="space-y-6 w-[480px]">
                        <div className="space-y-2">
                            <h2 className="text-heading-h4-desktop leading-none font-semibold text-alias-primary w-[15ch]">
                                Log into your account
                            </h2>
                            <p className="text-body-md-desktop text-text-colour-body max-w-md">
                                Please enter your email for a one-time-only code
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Dropdown
                                id="login-customer-type"
                                label="Customer type"
                                options={customerTypes}
                                state="Default"
                                placeholder="Select type"
                                value={customerType}
                                onValueChange={setCustomerType}
                            />

                            <Input
                                label="Email"
                                value={email}
                                onChange={setEmail}
                                helperId="login-email"
                                required
                            />

                            <div className="space-y-3">
                                <Button variant="secondary" size="medium" onClick={() => { }}>
                                    Continue
                                </Button>
                                <Button variant="tertiary" size="medium" onClick={() => { }}>
                                    Login with your password
                                </Button>
                            </div>
                        </div>

                        <div>
                            <ContactCard size="desktop" />
                        </div>
                    </div>


                    <div className="space-y-6 lg:pt-10 w-[375px]">
                        <div className="space-y-2">
                            <h2 className="text-heading-h4-mobile leading-tight font-semibold text-alias-primary">
                                Log into your account
                            </h2>
                            <p className="text-body-sm text-text-colour-body">
                                Please enter your email for a one-time-only code
                            </p>
                        </div>
                        <div className="space-y-4">
                            <Dropdown
                                id="login-customer-type-mobile"
                                label="Customer type"
                                options={customerTypes}
                                state="Default"
                                placeholder="Select type"
                                value={customerType}
                                onValueChange={setCustomerType}
                            />

                            <Input
                                label="Email"
                                value={email}
                                onChange={setEmail}
                                helperId="login-email-mobile"
                                required
                            />

                            <div className="space-y-3">
                                <Button variant="secondary" size="medium" onClick={() => { }}>
                                    Continue
                                </Button>
                                <Button variant="tertiary" size="medium" onClick={() => { }}>
                                    Login with your password
                                </Button>
                            </div>
                        </div>

                        <div>
                            <ContactCard size="mobile" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
