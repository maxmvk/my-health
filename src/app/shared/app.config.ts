import {UserNotificationsInterface, InitChatbotOptionsInterface} from './models';

export const userNotifications: UserNotificationsInterface = {
  CREATING_AVATAR: 'Calculating model',
  FAILED_TO_GENERATE_AVATAR: 'Failed to generate avatar. Please, try to upload another photo',
  UNAVAILABLE_TO_GENERATE_AVATAR: 'The function of generating an avatar is temporarily unavailable. Please try again later'
};

export const INITIAL_CHATBOT_OPTIONS: InitChatbotOptionsInterface = {
  buttons: [
    {text: 'Update My Avatar', value: 'Update avatar'},
    {text: 'Nutritional Information', value: 'Nutrition'},
    {text: 'General Information', value: 'Information'},
    {text: 'Services', value: 'Services'}
  ]
};
