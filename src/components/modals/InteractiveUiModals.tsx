import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, Check, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBottomSheetMotion } from '../../hooks/useBottomSheetMotion';
import { playUiMotionSound } from '../../utils/uiMotionSound';
import {
  ACTION_BTN_PRIMARY,
  ACTION_BTN_SECONDARY,
  ACTION_BTN_SOFT_PRIMARY,
} from '../../constants/buttonStyles';

const DemoModalSheet: React.FC<{
  variant: string;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ variant, onClose, onConfirm }) => {
  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose,
  });

  useEffect(() => {
    playUiMotionSound('pop');
  }, [variant]);

  return (
    <div
      ref={backdropRef}
      data-modal-sheet-backdrop="true"
      className={`animate-ui-fade fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex ${
        variant === 'centered' ? 'items-center' : 'items-end sm:items-start sm:pt-14'
      } justify-center p-0 sm:p-4 no-print`}
    >
      <div
        ref={setSheetElement}
        {...sheetGestureProps}
        className="w-full sm:max-w-lg bg-white rounded-t-[28px] sm:rounded-[26px] p-6 space-y-4 shadow-2xl animate-bottom-sheet"
      >
        <div
          data-sheet-handle="true"
          className="sm:hidden flex justify-center py-2 -mt-3 -mb-1 cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="w-10 h-1 bg-black/20 rounded-full animate-sheet-handle" />
        </div>
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.12]">
          <div>
            <span className="text-[10.5px] font-bold uppercase text-[#ee2e65]">
              Modal Variant · {variant.toUpperCase()}
            </span>
            <h3 className="text-[17px] font-semibold text-[#1C1D21]">
              {variant === 'scroll'
                ? 'Scrolling Long Content Modal'
                : variant === 'centered'
                ? 'Vertically Centered Modal'
                : `Servolution ${variant.toUpperCase()} Dialog`}
            </h3>
          </div>
          <button
            onClick={animateClose}
            className="w-8 h-8 rounded-full hover:bg-[#F4F5F8] hover:rotate-90 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {variant === 'scroll' ? (
          <div className="max-h-56 overflow-y-auto pr-2 space-y-3 text-[12.5px] text-[#5A5D67] leading-relaxed">
            {Array.from({ length: 6 }).map((_, idx) => (
              <p key={idx}>
                Paragraph {idx + 1}: This modal body demonstrates smooth internal scrolling when academic guidelines, exam regulations, or lengthy rubrics exceed the viewport height while keeping the header and action buttons fixed.
              </p>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-[#5A5D67] leading-relaxed">
            This is an interactive <strong>{variant.toUpperCase()}</strong> modal container styled with Servolution design tokens, rounded corners, and smooth entrance motion.
          </p>
        )}

        <div className="flex justify-end gap-2.5 pt-3 border-t border-black/[0.12]">
          <button
            onClick={animateClose}
            className={ACTION_BTN_SECONDARY}
          >
            <X className="w-4 h-4 sm:hidden shrink-0" />
            <span>Close</span>
          </button>
          <button
            onClick={() => {
              onConfirm();
              animateClose();
            }}
            className={ACTION_BTN_PRIMARY}
          >
            <Check className="w-4 h-4 sm:hidden shrink-0" />
            <span>Confirm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const DrawerSpecSheet: React.FC<{
  spec: { type: string; dir: string };
  onClose: () => void;
}> = ({ spec, onClose }) => {
  const isBottomDrawer = spec.dir === 'bottom';
  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose,
    alwaysBottomSheet: isBottomDrawer,
  });

  const handleClose = isBottomDrawer
    ? animateClose
    : () => {
        playUiMotionSound('tick');
        onClose();
      };

  useEffect(() => {
    playUiMotionSound('pop');
  }, [spec.dir, spec.type]);

  return (
    <div
      ref={backdropRef}
      data-modal-sheet-backdrop="true"
      className="animate-ui-fade fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex no-print"
    >
      <div
        ref={isBottomDrawer ? setSheetElement : undefined}
        {...(isBottomDrawer ? sheetGestureProps : {})}
        className={`bg-white shadow-2xl p-6 flex flex-col justify-between transition-all duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
          spec.dir === 'left'
            ? 'w-80 max-w-[85vw] h-full mr-auto rounded-r-[28px] animate-ui-drawer-left'
            : spec.dir === 'right'
            ? 'w-80 max-w-[85vw] h-full ml-auto rounded-l-[28px] animate-ui-drawer-right'
            : spec.dir === 'top'
            ? 'w-full max-h-[60vh] mb-auto rounded-b-[28px] animate-ui-drawer-top'
            : 'w-full max-h-[65vh] mt-auto rounded-t-[28px] animate-ui-drawer-bottom'
        }`}
      >
        <div className="space-y-4">
          {isBottomDrawer && (
            <div
              data-sheet-handle="true"
              className="flex justify-center py-2 -mt-3 -mb-1 cursor-grab active:cursor-grabbing touch-none"
            >
              <div className="w-10 h-1 bg-black/20 rounded-full animate-sheet-handle" />
            </div>
          )}
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.12]">
            <div>
              <span className="text-[10.5px] font-bold uppercase text-[#ee2e65]">
                {spec.type} · {spec.dir.toUpperCase()} Placement
              </span>
              <h3 className="text-[17px] font-semibold text-[#1C1D21]">Servolution {spec.dir} Panel</h3>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full hover:bg-[#F4F5F8] hover:rotate-90 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[13px] text-[#5A5D67] leading-relaxed">
            This slide-over {spec.type} opens smoothly from the <strong>{spec.dir}</strong> edge of the viewport, ideal for quick filters, student inspectors, and mobile navigation.
          </p>
        </div>
        <div className="pt-4 border-t border-black/[0.12] flex justify-end gap-2">
          <button
            onClick={handleClose}
            className={ACTION_BTN_SOFT_PRIMARY}
          >
            <X className="w-4 h-4 sm:hidden shrink-0" />
            <span className="sm:hidden">Close</span>
            <span className="hidden sm:inline">Close {spec.type}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SweetAlertSheet: React.FC<{
  type: 'success' | 'confirm';
  onClose: () => void;
  onAcknowledge: () => void;
}> = ({ type, onClose, onAcknowledge }) => {
  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose,
  });

  useEffect(() => {
    playUiMotionSound(type === 'success' ? 'success' : 'pop');
  }, [type]);

  return (
    <div
      ref={backdropRef}
      data-modal-sheet-backdrop="true"
      className="animate-ui-fade fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 no-print"
      onClick={animateClose}
    >
      <div
        ref={setSheetElement}
        {...sheetGestureProps}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-sm bg-white rounded-t-[28px] sm:rounded-[26px] p-6 text-center space-y-3 shadow-2xl animate-bottom-sheet"
      >
        <div
          data-sheet-handle="true"
          className="sm:hidden flex justify-center py-2 -mt-3 -mb-1 cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="w-10 h-1 bg-black/20 rounded-full animate-sheet-handle" />
        </div>
        <div
          className={`animate-ui-check w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
            type === 'success' ? 'bg-[#E6F9F0] text-[#10B981]' : 'bg-[#FFECEB] text-[#EF4444]'
          }`}
        >
          {type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
        </div>
        <h3 className="text-[17px] font-bold text-[#1C1D21]">
          {type === 'success' ? 'Good job!' : 'Are you sure?'}
        </h3>
        <p className="text-[12.5px] text-[#5A5D67]">
          {type === 'success'
            ? 'Your academic syllabus changes have been published.'
            : 'You will not be able to recover this deleted record!'}
        </p>
        <div className="flex gap-2 pt-2">
          {type === 'confirm' && (
            <button
              onClick={animateClose}
              className={`${ACTION_BTN_SECONDARY} flex-1`}
            >
              <X className="w-4 h-4 sm:hidden shrink-0" />
              <span>Cancel</span>
            </button>
          )}
          <button
            onClick={() => {
              onAcknowledge();
              animateClose();
            }}
            className={`${ACTION_BTN_PRIMARY} flex-1`}
          >
            <Check className="w-4 h-4 sm:hidden shrink-0" />
            <span className="sm:hidden">{type === 'success' ? 'OK' : 'Proceed'}</span>
            <span className="hidden sm:inline">{type === 'success' ? 'OK' : 'Yes, proceed!'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SessionTimeoutSheet: React.FC<{
  onClose: () => void;
  onExtend: () => void;
}> = ({ onClose, onExtend }) => {
  const { setSheetElement, backdropRef, animateClose, sheetGestureProps } = useBottomSheetMotion({
    onClose,
  });

  useEffect(() => {
    playUiMotionSound('pop');
  }, []);

  return (
    <div
      ref={backdropRef}
      data-modal-sheet-backdrop="true"
      className="animate-ui-fade fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 no-print"
      onClick={animateClose}
    >
      <div
        ref={setSheetElement}
        {...sheetGestureProps}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-sm bg-white rounded-t-[28px] sm:rounded-[26px] p-6 space-y-3 shadow-2xl animate-bottom-sheet"
      >
        <div
          data-sheet-handle="true"
          className="sm:hidden flex justify-center py-2 -mt-3 -mb-1 cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="w-10 h-1 bg-black/20 rounded-full animate-sheet-handle" />
        </div>
        <div className="flex items-center gap-2.5 text-[#8C5811]">
          <Clock className="w-5 h-5" />
          <h3 className="text-[16px] font-bold text-[#1C1D21]">Session Timeout Warning</h3>
        </div>
        <p className="text-[12.5px] text-[#5A5D67]">
          Your Servolution session will automatically lock in <strong>00:59</strong> due to inactivity.
        </p>
        <div className="flex gap-2 pt-2">
          <button
            onClick={animateClose}
            className={`${ACTION_BTN_SECONDARY} flex-1`}
          >
            <LogOut className="w-4 h-4 sm:hidden shrink-0" />
            <span>Logout</span>
          </button>
          <button
            onClick={() => {
              onExtend();
              animateClose();
            }}
            className={`${ACTION_BTN_PRIMARY} flex-1`}
          >
            <Check className="w-4 h-4 sm:hidden shrink-0" />
            <span className="sm:hidden">Stay</span>
            <span className="hidden sm:inline">Stay Connected</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const InteractiveUiModals: React.FC = () => {
  const {
    activeDemoModal,
    setActiveDemoModal,
    activeDrawerSpec,
    setActiveDrawerSpec,
    uiSweetAlertType,
    setUiSweetAlertType,
    uiSessionModal,
    setUiSessionModal,
    triggerToast,
  } = useApp();

  return (
    <>
      {activeDemoModal && (
        <DemoModalSheet
          variant={activeDemoModal}
          onClose={() => setActiveDemoModal(null)}
          onConfirm={() =>
            triggerToast('Action Confirmed', `Closed ${activeDemoModal.toUpperCase()} modal.`, 'success')
          }
        />
      )}

      {activeDrawerSpec && (
        <DrawerSpecSheet
          spec={activeDrawerSpec}
          onClose={() => setActiveDrawerSpec(null)}
        />
      )}

      {uiSweetAlertType && (
        <SweetAlertSheet
          type={uiSweetAlertType}
          onClose={() => setUiSweetAlertType(null)}
          onAcknowledge={() =>
            triggerToast('Sweet Alert Closed', 'Action acknowledged.', 'success')
          }
        />
      )}

      {uiSessionModal && (
        <SessionTimeoutSheet
          onClose={() => setUiSessionModal(false)}
          onExtend={() =>
            triggerToast('Session Extended', 'Stay logged in for another 60 minutes.', 'success')
          }
        />
      )}
    </>
  );
};
