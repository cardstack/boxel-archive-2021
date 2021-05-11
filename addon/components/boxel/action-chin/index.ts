import Component from '@glimmer/component';
import { equal } from 'macro-decorators';

enum CtaBlockState {
  // state before the cta has been activated/the action done
  default = 'default',
  // disabled state - currently visually corresponds to the default state.
  // design has no immediate plans to make a disabled state for the memorialized cta
  disabled = 'disabled',
  // in progress state - action has been taken, but not completed
  inProgress = 'in-progress',
  // memorialized state - requirement for CTA has been met
  memorialized = 'memorialized',
}

interface CtaBlockArguments {
  stepNumber: number;
  state: CtaBlockState;
}
export default class ActionChin extends Component<CtaBlockArguments> {
  // convenience getters for state booleans. they are mutually exclusive since all are
  // derived from the args.state argument.
  @equal('args.state', CtaBlockState.default) declare isDefault: boolean;
  @equal('args.state', CtaBlockState.disabled) declare isDisabled: boolean;
  @equal('args.state', CtaBlockState.inProgress) declare isInProgress: boolean;
  @equal('args.state', CtaBlockState.memorialized)
  declare isMemorialized: boolean;
}
