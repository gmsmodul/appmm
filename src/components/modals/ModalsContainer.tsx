import React from 'react';
import { InteractiveUiModals } from './InteractiveUiModals';
import { MultimediaDetailModal } from './MultimediaDetailModal';
import { AddDocumentModal } from './AddDocumentModal';
import { AttachDocumentModal } from './AttachDocumentModal';
import { SettingsInfoModal } from './SettingsInfoModal';
import { CrudEntityModal } from './CrudEntityModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const ModalsContainer: React.FC = () => {
  return (
    <>
      <InteractiveUiModals />
      <MultimediaDetailModal />
      <AddDocumentModal />
      <AttachDocumentModal />
      <SettingsInfoModal />
      <CrudEntityModal />
      <ConfirmDeleteModal />
    </>
  );
};
